# Days-On-Market Liquidity Elasticity Skill

## Purpose
How sensitive is listing liquidity (Days-On-Market) to price per square foot premiums in South Florida luxury sub-markets?

## When to Use
Activate this skill when a seller or listing agent needs to understand the liquidity penalty (added DOM) associated with overpricing a property above neighborhood market averages.

## Required Inputs
- `df`: Path to MLS dataset (`/analysis/south_florida_mls_data.csv`).
- `price_col`: Price per square foot column (default: `price_per_sqft`).
- `dom_col`: Days-on-market column (default: `days_on_market`).

## Files Used
- `/analysis/south_florida_mls_data.csv`
- `/analysis/R/dom_elasticity.R`
- `/analysis/plumber.R` (Endpoint: `POST /dom-elasticity` or `POST /run-skill`)

## Method
Pearson Correlation Coefficient ($r$) and Linear Regression Elasticity Model:
$$\text{DOM} = \alpha + \beta (\text{Price/SqFt}) + \epsilon$$
$$\text{Elasticity Coefficient} = \beta \times 100 \quad \text{(Days added per \$100/sqft premium)}$$

## Procedure
1. Load dataset and handle missing values.
2. Compute Pearson correlation between `price_per_sqft` and `days_on_market`.
3. Fit linear regression model `lm(days_on_market ~ price_per_sqft)`.
4. Calculate slope parameter $\beta$ to determine additional days on market per $100 price increase per square foot.
5. Generate scatterplot with fitted regression elasticity trend line.

## Validation
- Verify both `price_per_sqft` and `days_on_market` vectors contain at least 5 non-null observations.
- Confirm positive variability ($SD > 0$) in both variables.

## Output
Pearson correlation $r$, regression slope $\beta$, additional DOM per $100/sqft premium, median market DOM, and scatterplot visualization.

## Interpretation
"Analysis reveals a strong positive correlation ($r = 0.721$) between $/sqft pricing and Days-On-Market. Pricing a luxury residence $100/sqft above median market comp adds an estimated 4.9 additional days on market before contract execution."

## Limitation
Correlation does not prove direct causation; high DOM may also stem from improper staging, uncooperative tenant access, seasonal listing timing, or unique floorplan layouts.
