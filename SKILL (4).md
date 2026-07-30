# Use a Statistical Model Skill

## Purpose
What is the estimated market value of a South Florida luxury property given its structural and financial features (square footage, bedrooms, bathrooms, and monthly HOA fees)?

## When to Use
Activate this skill when the user requests property valuation, comparative market analysis (CMA), or regression modeling based on property characteristics.

## Required Inputs
- `df`: MLS dataset (`/analysis/south_florida_mls_data.csv`).
- `target_sqft`: Property interior square footage (numeric, e.g. 2400).
- `target_beds`: Bedroom count (numeric, e.g. 3).
- `target_baths`: Bathroom count (numeric, e.g. 3.5).
- `target_hoa`: Monthly HOA maintenance fee in dollars (numeric, e.g. 850).

## Files Used
- `/analysis/south_florida_mls_data.csv`
- `/analysis/R/model.R`
- `/analysis/plumber.R` (Endpoint: `POST /model`)

## Method
Multiple linear regression (Hedonic Pricing Model):
$$\text{Price} = \beta_0 + \beta_1(\text{sqft}) + \beta_2(\text{beds}) + \beta_3(\text{baths}) + \beta_4(\text{hoa}) + \epsilon$$

## Procedure
1. Load dataset and fit multiple linear regression model `lm()`.
2. Extract $R^2$, Adjusted $R^2$, F-statistic, and p-values for all predictor coefficients.
3. Construct target data frame with user input features.
4. Call `predict(model, newdata, interval = "confidence", level = 0.95)`.
5. Extract point prediction, 95% lower bound, and 95% upper bound.
6. Return structured model valuation summary.

## Validation
- Validate all input parameters are strictly positive numeric values (`target_sqft > 0`, `target_beds > 0`).
- Reject out-of-bounds parameters (e.g. `target_sqft > 50000` or `target_sqft < 200`).
- Verify model convergence and absence of rank deficiency.

## Output
Point estimate valuation ($), 95% confidence interval range, regression coefficients table, and model $R^2$ goodness-of-fit.

## Interpretation
"The hedonic regression model estimates the subject property market value at $2,324,800 with a 95% confidence interval of [$1,212,235, $3,437,364]. The model accounts for 97.6% of price variance ($R^2 = 0.976$) — though with only 10 observations fitting 4 predictors, this very high $R^2$ likely reflects overfitting rather than a stable, generalizable relationship, as the wide confidence interval suggests."

## Limitation
Hedonic linear models assume linear additive feature impacts and may underpredict ultra-custom architectural finishes, specific high-floor stack lines, or direct oceanfront orientation premiums.
