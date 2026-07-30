# South Florida Luxury Real Estate AI Agent & Statistical Analytics System

**Project Title**: South Florida Luxury Real Estate AI Agent & Statistical Analytics Engine  
**Student Name**: Konrad Schultz, Realtor® (Beachfront Realty • License # 3188541)  
**Selected Implementation Level**: Level 1 (Quarto Statistical Report) & Level 3 (Full Local Statistical Application with R Plumber API)  
**Industry**: South Florida Luxury Real Estate (Aventura, Sunny Isles Beach, Bal Harbour, Brickell, Fort Lauderdale)  
**Intended User**: Luxury Home Buyers, Sellers, Real Estate Investors, and Listing Agents  
**Institution**: Miami Dade College  

This repository contains two connected pieces: a live real estate website (React + Express + Gemini AI Concierge, in `src/` and `server.ts`) and the statistical analytics engine described below (R + Quarto + Plumber API, in `analysis/`).

---

## 🎯 Industry Problem

South Florida's luxury residential real estate market presents three critical analytical challenges:

1. **Extreme Price-per-Square-Foot Variance**: Driven by oceanfront orientation, luxury tower amenities, and floor stack elevation ($600/sqft to $1,200+/sqft).
2. **HOA Fee Distortion on Net Operating Income**: High monthly maintenance fees ($700–$2,400/mo) significantly diminish investor Net Operating Income (NOI) and cap rates.
3. **Liquidity Penalties & Days-On-Market (DOM)**: Overpriced properties experience exponential delays in Days-On-Market, damaging seller bargaining leverage.

---

## 💡 Decision Supported

This statistical AI Agent system empowers users to make four high-stakes decisions:
* **Offer Pricing**: Data-driven target valuation for buyers through hedonic multiple linear regression.
* **Listing Pricing Strategy**: Minimizing Days-On-Market liquidity penalties by pricing accurately relative to neighborhood comps.
* **Investment Yield Evaluation**: Calculating Net Operating Income (NOI) and Capitalization Rates after vacancy and operating expenses.
* **Stochastic Risk Assessment**: Stress-testing cash-on-cash ROI across 1,000 Monte Carlo simulated rental and occupancy cycles.

---

## 📊 Dataset Source

- **Source File**: `/analysis/south_florida_mls_data.csv`
- **Description**: Active public MLS listing observations across prime South Florida coastal corridors.
- **Key Variables**: `mls_number`, `title`, `city`, `neighborhood`, `property_type`, `price`, `sqft`, `beds`, `baths`, `year_built`, `hoa_monthly`, `price_per_sqft`, `days_on_market`, `cap_rate`.

---

## 🤖 Six-Skill Summary Table

| Skill | User Question | Method | Main Output | Decision Supported |
| :--- | :--- | :--- | :--- | :--- |
| **Explore** | What is the distribution and five-number summary of $/sqft across South Florida listings? | Descriptive Parametric & Non-Parametric Statistics | Mean ($850.46), Median ($782.16), SD ($211.14), IQR ($333.23), and Histogram | Market baseline pricing understanding |
| **Compare** | Is there a statistically significant difference in $/sqft between Single Family homes and Luxury Condos? | Two-Sample Welch's t-test ($p = 0.937$) | Group Means ($986.53 vs $970.10, n=2 each), $t = -0.09$, 95% Confidence Interval [-852.45, 819.60] — not statistically significant | Evaluating land equity vs. condo amenity premiums (preliminary; small sample) |
| **Model** | What is the estimated market value of a 2,400 sqft residence given beds, baths, and HOA fees? | Multiple Linear Regression (Hedonic Pricing Model, $R^2 = 0.976$) | Point Estimate ($2,324,800) & 95% Confidence Interval [$1,212,235, $3,437,364] | Comparative Market Analysis (CMA) offer selection |
| **Additional Skill 1** *(Cap Rate & NOI)* | What is the Net Operating Income and Cap Rate for an income-producing luxury rental asset? | Financial Cash Flow Analytics & Cap Rate Formula | Effective Gross Income ($85,500), NOI ($73,500), Cap Rate (6.13%) | Investment yield benchmarking & acquisition evaluation |
| **Additional Skill 2** *(DOM Elasticity)* | How many extra days on market result from overpricing a listing by $100/sqft? | Pearson Correlation ($r = 0.721$) & Linear Regression Slope | Liquidity penalty (+4.9 Days/100/sqft premium), Median DOM (24.5 days) | Optimal listing price strategy to avoid stale inventory |
| **Additional Skill 3** *(Monte Carlo ROI)* | What is the 90% confidence range for Cash-on-Cash ROI under rental rate and occupancy volatility? | Stochastic Monte Carlo Simulation ($N=1,000$) | Mean ROI (~3.6%), 90% CI [-1.6%, 8.4%], $P(\text{Cash Flow} > 0) = 88.5\%$ | Capital allocation & risk stress-testing |

---

## 🖥️ System Architecture & Visual Interfaces

### Interactive AI Agent Valuation Dashboard
![South Florida MLS AI Analytics Dashboard](assets/dashboard_screenshot.png)

*Figure 1: Interactive Valuation & Analytics Interface for Realtor® Konrad Schultz.*

---

## 💻 Instructions for Running or Viewing the Project

### Required Software
* **R Computing Environment**: R version 4.2.0 or higher
* **Quarto CLI**: Version 1.3 or higher
* **Node.js**: Version 18.0 or higher (for local web dashboard runtime)

### Required R Packages
```R
install.packages(c("plumber", "jsonlite", "ggplot2", "knitr", "rmarkdown", "stats"))
```

### Execution Steps

#### 1. Run Master R Analytics Engine
```bash
Rscript analysis/real_estate_analytics.R
```

#### 2. Start Plumber API Backend (Level 3 Local Application)
```bash
Rscript -e 'library(plumber); pr <- plumb("analysis/plumber.R"); pr$run(host = "0.0.0.0", port = 8000)'
```

#### 3. Render Executable Quarto Statistical Report (Level 1 Output)
```bash
quarto render analysis/report.qmd --to html
```

---

## 🌐 Running the Interactive Website

The public-facing site (React 19 + Vite + Express, with a Gemini-powered AI Concierge) lives in `src/` and `server.ts`, separate from the R/Quarto analytics above.

### Required Software
* **Node.js**: Version 18.0 or higher
* A **Gemini API key** ([aistudio.google.com](https://aistudio.google.com))

### Setup
```bash
# 1. Install dependencies
npm install

# 2. Configure your Gemini API key
cp .env.example .env.local
# then edit .env.local and set GEMINI_API_KEY="your-key-here"

# 3. Start the dev server
npm run dev
```

The site will be available locally (Vite's default is `http://localhost:5173`, with the Express API on the port set in `server.ts`).

### Production Build
```bash
npm run build   # bundles the client (Vite) and server (esbuild)
npm run start   # runs the built server from dist/
```

> **Note:** `.env.local` is git-ignored — never commit your actual `GEMINI_API_KEY`. Only `.env.example` (with placeholder values) should be tracked in the repo.

---

## 🛡️ Demonstrated Validation Rules

1. **Unknown/Non-Numeric Variable Guardrail**: Rejects exploratory requests on non-existent or categorical columns (`400_INVALID_VARIABLE`).
2. **Parameter Bounds Enforcement**: Rejects out-of-bounds parameters (e.g. square footage $> 50,000$, vacancy rate $> 20\%$, or down payment exceeding purchase price).
3. **Minimum Observation Check ($N \ge 3$)**: Prevents statistical testing on insufficient observations.
4. **Expense Sanity Guardrail**: Rejects Cap Rate calculations if annual expenses equal or exceed gross annual rental revenue.

---

## 🤖 How Google Antigravity and Agent Skills Were Used

Google Antigravity and Agent Skills were utilized throughout the project lifecycle to automate analytical pipelines, construct R Plumber API endpoints, and structure statistical guardrails. Below are three detailed examples of agent interaction, student review, and corrections:

### Example 1: Hedonic Regression Model Generation & Parameter Validation
* **Request given to Antigravity**: "Create a statistical model skill that fits a multiple linear regression model predicting luxury property prices based on square footage, bedrooms, bathrooms, and monthly HOA fees, with a prediction endpoint for new properties."
* **Skill Used**: `skills/model/SKILL.md` (Use a Statistical Model)
* **File Created/Changed**: `/analysis/R/model.R`, `/analysis/skills/model/SKILL.md`, `/analysis/plumber.R`
* **What the Student Reviewed**: The student verified the model formulas, $R^2$ extraction logic, confidence interval calculations (`predict(fit, newdata, interval = "confidence")`), and R execution output.
* **What the Student Corrected/Accepted/Rejected**:
  * *Accepted*: The choice of multiple linear regression with `lm()` and automated confidence interval output.
  * *Corrected/Rejected*: The initial agent code did not bound input parameters. The student added validation rules rejecting square footage over 50,000 sqft and non-positive inputs to prevent model extrapolation errors.

### Example 2: Stochastic Monte Carlo Investor ROI Simulation
* **Request given to Antigravity**: "Design a custom student skill that runs Monte Carlo simulations to model investor cash-on-cash ROI under rental rate and occupancy volatility."
* **Skill Used**: `skills/monte-carlo-roi/SKILL.md` (Monte Carlo ROI Simulation)
* **File Created/Changed**: `/analysis/R/monte_carlo_roi.R`, `/analysis/skills/monte-carlo-roi/SKILL.md`, `/analysis/plumber.R`
* **What the Student Reviewed**: The student reviewed the random distribution functions (`rnorm()`), seed initialization (`set.seed(123)`), and percentile quantiles (`quantile(coc_roi, c(0.05, 0.95))`).
* **What the Student Corrected/Accepted/Rejected**:
  * *Accepted*: The stochastic approach drawing $N=1,000$ iterations and probability of positive cash flow output.
  * *Corrected/Rejected*: The original agent code generated unconstrained negative occupancy rates. The student added truncation bounds (`pmin(pmax(..., 0.70), 1.00)`) to enforce real-world occupancy limits between 70% and 100%.

### Example 3: R Plumber API Router & Universal Skill Execution Endpoint
* **Request given to Antigravity**: "Build an R Plumber API for Level 3 that exposes all six skills through dedicated POST endpoints as well as a universal `/run-skill` route."
* **Skill Used**: `skills/explore/SKILL.md`, `skills/compare/SKILL.md`, `skills/cap-rate-noi/SKILL.md`, `skills/dom-elasticity/SKILL.md`
* **File Created/Changed**: `/analysis/plumber.R`, `/backend/plumber.R`
* **What the Student Reviewed**: The student tested HTTP endpoints via API requests, verified JSON response payloads, and audited error-handling blocks.
* **What the Student Corrected/Accepted/Rejected**:
  * *Accepted*: Plumber annotations (`#* @post /explore`, `#* @get /health`), parameter parsing, and structured JSON output.
  * *Corrected/Rejected*: Antigravity initially attempted to load the CSV file inside every API request function. The student refactored the script to load and clean `south_florida_mls_data.csv` once at server startup, significantly boosting API response speed.

---

## ⚠️ Main Limitations

* **Observational Cross-Sectional Data**: Linear regression coefficients represent observational correlation rather than strict direct causation.
* **Macroeconomic Volatility**: Models reflect current cross-sectional MLS data and do not dynamically project sudden interest rate spikes or insurance rate adjustments.
* **Unannounced Building Assessments**: HOA monthly maintenance figures do not capture pending unannounced condo association special assessments.

---

## 👤 Contact & Realtor® Credentials

* **Lead Realtor®**: Konrad Schultz (License # 3188541)
* **Brokerage**: Beachfront Realty, Inc.
* **Aventura Office**: 20803 Biscayne Blvd, Suite 102, Aventura, FL 33180
* **Direct Phone**: 954-297-5559
* **Email**: KonradSchultz001@mymdc.net
