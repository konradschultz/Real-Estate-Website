# Explore Data Skill

## Purpose
What is the distribution, central tendency, variation, and data quality of key real estate metrics across South Florida luxury listing sub-markets?

## When to Use
Activate this skill when the user requests an overview, distribution, five-number summary, histogram, or summary statistics for property prices, $/sqft, HOA fees, or Days-On-Market (DOM).

## Required Inputs
- `dataset`: Path to the South Florida MLS CSV file (`/analysis/south_florida_mls_data.csv`).
- `target_variable`: The numerical variable to analyze (e.g., `price`, `price_per_sqft`, `sqft`, `days_on_market`).
- `filter_city`: (Optional) Specific municipality filter (e.g., `"Aventura"`, `"Sunny Isles Beach"`).

## Files Used
- `/analysis/south_florida_mls_data.csv`
- `/analysis/R/explore.R`
- `/analysis/plumber.R` (Endpoint: `POST /explore`)

## Method
Computes parametric metrics (Mean, Standard Deviation) and non-parametric metrics (Median, IQR, Min, Max), checks for missing or zero values, and generates distribution boxplots and histograms.

## Procedure
1. Load dataset from `/analysis/south_florida_mls_data.csv`.
2. Validate that `target_variable` exists and is numeric.
3. Filter by city if requested.
4. Calculate mean, median, SD, IQR, min, max, and missing value count.
5. Generate distribution visualization plot using R `ggplot2`.
6. Return structured JSON payload with summary and interpretation.

## Validation
- Validate that `target_variable` exists in the dataset.
- Reject non-numeric columns requested for numeric distribution analysis.
- Confirm sample size $N \ge 3$ after filtering.
- Stop and return error code `400_INVALID_VARIABLE` if validation fails.

## Output
Returns descriptive statistics table (Mean, Median, SD, IQR, Min, Max, Count) and base64/PNG distribution histogram plot.

## Interpretation
"In South Florida luxury markets, the median price per square foot is $782.16 with an IQR of $333.23 (N=10 listings). Prices exhibit a right-skewed distribution driven by ultra-luxury waterfront estates in Bal Harbour and Key Biscayne."

## Limitation
Descriptive exploratory statistics reveal cross-sectional sample properties but do not account for temporal shifts, interest rate fluctuations, or specific building amenity premiums.
