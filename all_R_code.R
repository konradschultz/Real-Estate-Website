# ==============================================================================
# South Florida Real Estate Analytics - Combined R Skill Scripts
# Konrad Schultz, Realtor (Beachfront Realty, License # 3188541)
#
# This file combines all individual R skill scripts from analysis/R/ into one
# file for convenience. Each section below corresponds to a separate .R file
# in the actual project (analysis/R/<filename>), referenced in each skill's
# SKILL.md and sourced by analysis/plumber.R.
# ==============================================================================

# ------------------------------------------------------------------------------
# File: analysis/R/import_data.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Import Data Script - South Florida MLS Real Estate Analysis
# ==============================================================================

import_mls_data <- function(file_path = "/analysis/south_florida_mls_data.csv") {
  if (!file.exists(file_path)) {
    # Fallback to local path if running relative
    file_path <- "south_florida_mls_data.csv"
  }
  
  if (!file.exists(file_path)) {
    stop("VALIDATION_ERROR: MLS dataset file not found at path: ", file_path)
  }
  
  df <- read.csv(file_path, stringsAsFactors = FALSE)
  message("[DATA IMPORT]: Loaded ", nrow(df), " records from ", file_path)
  return(df)
}


# ------------------------------------------------------------------------------
# File: analysis/R/clean_data.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Clean Data Script - Data Cleaning & Validation Rules
# ==============================================================================

clean_mls_data <- function(df) {
  # 1. Validation Rule: Minimum observation check
  if (is.null(df) || nrow(df) < 3) {
    stop("VALIDATION_ERROR: Dataset contains fewer than 3 records.")
  }
  
  # 2. Validation Rule: Required columns check
  required_cols <- c("price", "sqft", "beds", "baths", "days_on_market", "price_per_sqft")
  missing_cols <- setdiff(required_cols, names(df))
  if (length(missing_cols) > 0) {
    stop("VALIDATION_ERROR: Dataset is missing required columns: ", paste(missing_cols, collapse = ", "))
  }
  
  # 3. Clean numeric types and remove non-positive prices/sqft
  df <- df[df$price > 0 & df$sqft > 0, ]
  
  # 4. Derived metric verification
  df$calculated_price_per_sqft <- round(df$price / df$sqft, 2)
  
  message("[DATA CLEANING]: Successfully processed ", nrow(df), " valid records.")
  return(df)
}


# ------------------------------------------------------------------------------
# File: analysis/R/explore.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Skill 1: Explore Data Analysis
# ==============================================================================

run_explore_data <- function(df, target_variable = "price_per_sqft", filter_city = NULL) {
  # Validation Rule 1: Check variable existence
  if (!target_variable %in% names(df)) {
    stop("VALIDATION_ERROR: Requested target variable '", target_variable, "' does not exist in dataset.")
  }
  
  # Validation Rule 2: Ensure variable is numeric
  if (!is.numeric(df[[target_variable]])) {
    stop("VALIDATION_ERROR: Target variable '", target_variable, "' must be numeric.")
  }
  
  # Optional city filter
  if (!is.null(filter_city) && filter_city != "") {
    df <- df[df$city == filter_city, ]
    if (nrow(df) < 2) {
      stop("VALIDATION_ERROR: Insufficient observations (N < 2) after filtering for city: ", filter_city)
    }
  }
  
  vals <- df[[target_variable]]
  
  stats <- list(
    skill = "Explore Data",
    target_variable = target_variable,
    sample_size = length(vals),
    mean = round(mean(vals, na.rm = TRUE), 2),
    median = round(median(vals, na.rm = TRUE), 2),
    sd = round(sd(vals, na.rm = TRUE), 2),
    iqr = round(IQR(vals, na.rm = TRUE), 2),
    min = min(vals, na.rm = TRUE),
    max = max(vals, na.rm = TRUE),
    missing_count = sum(is.na(vals))
  )
  
  return(stats)
}


# ------------------------------------------------------------------------------
# File: analysis/R/compare.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Skill 2: Compare Two Groups Analysis
# ==============================================================================

run_compare_groups <- function(df, group_col = "property_type", group1 = "Luxury Condo", group2 = "Single Family", outcome_metric = "price_per_sqft") {
  # Validation Rule 1: Check column existence
  if (!group_col %in% names(df) || !outcome_metric %in% names(df)) {
    stop("VALIDATION_ERROR: Specified columns do not exist in dataset.")
  }
  
  # Validation Rule 2: Ensure outcome metric is numeric
  if (!is.numeric(df[[outcome_metric]])) {
    stop("VALIDATION_ERROR: Outcome metric '", outcome_metric, "' must be numeric.")
  }
  
  # Extract group samples
  g1_vals <- df[df[[group_col]] == group1, outcome_metric]
  g2_vals <- df[df[[group_col]] == group2, outcome_metric]
  
  # Validation Rule 3: Group size check
  if (length(g1_vals) < 2 || length(g2_vals) < 2) {
    stop("VALIDATION_ERROR: Both comparison groups must contain at least 2 valid observations.")
  }
  
  # Execute Welch's t-test
  t_res <- t.test(g1_vals, g2_vals, var.equal = FALSE)
  
  mean1 <- mean(g1_vals, na.rm = TRUE)
  mean2 <- mean(g2_vals, na.rm = TRUE)
  diff_estimate <- mean1 - mean2
  
  list(
    skill = "Compare Two Groups",
    group_col = group_col,
    group1_name = group1,
    group1_n = length(g1_vals),
    group1_mean = round(mean1, 2),
    group2_name = group2,
    group2_n = length(g2_vals),
    group2_mean = round(mean2, 2),
    mean_difference = round(diff_estimate, 2),
    ci_95_lower = round(t_res$conf.int[1], 2),
    ci_95_upper = round(t_res$conf.int[2], 2),
    t_statistic = round(unname(t_res$statistic), 3),
    p_value = round(t_res$p.value, 4),
    statistically_significant_95 = (t_res$p.value < 0.05)
  )
}


# ------------------------------------------------------------------------------
# File: analysis/R/model.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Skill 3: Use a Statistical Model (Hedonic Regression)
# ==============================================================================

run_statistical_model <- function(df, target_sqft = 2400, target_beds = 3, target_baths = 3.5, target_hoa = 850) {
  # Validation Rule 1: Check positive non-zero parameters
  if (target_sqft <= 0 || target_beds <= 0 || target_baths <= 0 || target_hoa < 0) {
    stop("VALIDATION_ERROR: Property structural inputs (sqft, beds, baths) must be positive values.")
  }
  
  # Validation Rule 2: Upper bound sanity check
  if (target_sqft > 50000) {
    stop("VALIDATION_ERROR: Square footage input exceeds maximum allowable bounds (50,000 sqft).")
  }
  
  # Fit multiple linear regression model
  fit <- lm(price ~ sqft + beds + baths + hoa_monthly, data = df)
  
  new_obs <- data.frame(
    sqft = target_sqft,
    beds = target_beds,
    baths = target_baths,
    hoa_monthly = target_hoa
  )
  
  pred <- predict(fit, newdata = new_obs, interval = "confidence", level = 0.95)
  
  list(
    skill = "Use a Statistical Model",
    model_type = "Hedonic Multiple Linear Regression",
    r_squared = round(summary(fit)$r.squared, 4),
    adj_r_squared = round(summary(fit)$adj.r.squared, 4),
    target_sqft = target_sqft,
    target_beds = target_beds,
    target_baths = target_baths,
    target_hoa = target_hoa,
    point_estimate_price = round(unname(pred[1, "fit"])),
    confidence_95_lower = round(unname(pred[1, "lwr"])),
    confidence_95_upper = round(unname(pred[1, "upr"]))
  )
}


# ------------------------------------------------------------------------------
# File: analysis/R/cap_rate_noi.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Student-Designed Skill 1: Cap Rate & NOI Financial Modeling
# ==============================================================================

run_cap_rate_noi <- function(property_price, gross_monthly_rent, vacancy_rate = 0.05, annual_expenses = 12000) {
  # Validation Rule 1: Positive acquisition price and rent
  if (is.null(property_price) || property_price <= 0 || is.null(gross_monthly_rent) || gross_monthly_rent <= 0) {
    stop("VALIDATION_ERROR: Property price and gross monthly rent must be strictly positive numbers.")
  }
  
  # Validation Rule 2: Vacancy rate bounds (0.00 to 0.20)
  if (vacancy_rate < 0 || vacancy_rate > 0.20) {
    stop("VALIDATION_ERROR: Vacancy rate must be between 0.00 (0%) and 0.20 (20%).")
  }
  
  gross_annual_rent <- gross_monthly_rent * 12
  
  # Validation Rule 3: Expense sanity check
  if (annual_expenses >= gross_annual_rent) {
    stop("VALIDATION_ERROR: Annual expenses cannot exceed gross annual rental revenue.")
  }
  
  effective_gross_income <- gross_annual_rent * (1 - vacancy_rate)
  noi <- effective_gross_income - annual_expenses
  cap_rate <- (noi / property_price) * 100
  
  list(
    skill = "Cap Rate & NOI Financial Modeling",
    property_price = property_price,
    gross_annual_income = gross_annual_rent,
    effective_gross_income = effective_gross_income,
    annual_operating_expenses = annual_expenses,
    net_operating_income = noi,
    cap_rate_percent = round(cap_rate, 2)
  )
}


# ------------------------------------------------------------------------------
# File: analysis/R/dom_elasticity.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Student-Designed Skill 2: Days-On-Market Liquidity Elasticity
# ==============================================================================

run_dom_elasticity <- function(df) {
  # Validation Rule 1: Dataset check
  if (is.null(df) || nrow(df) < 3) {
    stop("VALIDATION_ERROR: Dataset must contain at least 3 property records.")
  }
  
  # Validation Rule 2: Column existence
  if (!"price_per_sqft" %in% names(df) || !"days_on_market" %in% names(df)) {
    stop("VALIDATION_ERROR: Dataset missing required columns 'price_per_sqft' or 'days_on_market'.")
  }
  
  clean_df <- na.omit(df[, c("price_per_sqft", "days_on_market")])
  
  correlation <- cor(clean_df$price_per_sqft, clean_df$days_on_market)
  dom_fit <- lm(days_on_market ~ price_per_sqft, data = clean_df)
  
  slope <- coef(dom_fit)[2]
  days_per_100_sqft <- round(slope * 100, 1)
  
  list(
    skill = "Days-On-Market Liquidity Elasticity",
    sample_size = nrow(clean_df),
    pearson_correlation = round(correlation, 3),
    days_added_per_100_dollars_sqft = days_per_100_sqft,
    median_days_on_market = median(clean_df$days_on_market)
  )
}


# ------------------------------------------------------------------------------
# File: analysis/R/monte_carlo_roi.R
# ------------------------------------------------------------------------------
# ==============================================================================
# Student-Designed Skill 3: Monte Carlo Investor ROI Simulation
# ==============================================================================

run_monte_carlo_roi <- function(purchase_price = 1000000, down_payment = 200000, 
                                 mean_rent = 6500, sd_rent = 500, 
                                 simulations = 1000) {
  # Validation Rule 1: Positive inputs
  if (purchase_price <= 0 || down_payment <= 0 || mean_rent <= 0) {
    stop("VALIDATION_ERROR: Purchase price, down payment, and mean rent must be positive values.")
  }
  
  # Validation Rule 2: Down payment bound check
  if (down_payment > purchase_price) {
    stop("VALIDATION_ERROR: Down payment cannot exceed total purchase price.")
  }
  
  # Validation Rule 3: Simulation count bounds
  if (simulations < 100 || simulations > 10000) {
    stop("VALIDATION_ERROR: Simulations count must be between 100 and 10,000.")
  }
  
  set.seed(123)
  
  sim_rents <- rnorm(simulations, mean = mean_rent, sd = sd_rent)
  sim_occ <- pmin(pmax(rnorm(simulations, mean = 0.94, sd = 0.03), 0.70), 1.00)
  
  annual_debt_service <- 48000
  annual_expenses <- 18000
  
  sim_noi <- (sim_rents * 12 * sim_occ) - annual_expenses
  sim_cash_flow <- sim_noi - annual_debt_service
  coc_roi <- (sim_cash_flow / down_payment) * 100
  
  list(
    skill = "Monte Carlo Investor ROI Simulation",
    total_simulations = simulations,
    mean_cash_on_cash_roi = round(mean(coc_roi), 2),
    median_cash_on_cash_roi = round(median(coc_roi), 2),
    confidence_5th_percentile = round(quantile(coc_roi, 0.05), 2),
    confidence_95th_percentile = round(quantile(coc_roi, 0.95), 2),
    probability_positive_cashflow_percent = round(mean(sim_cash_flow > 0) * 100, 1)
  )
}

