# Monte Carlo Investor Cash-on-Cash Return Simulation Skill

## Purpose
What is the probabilistic distribution and confidence range for Cash-on-Cash ROI (%) when factoring in stochastic fluctuations in rental rates, vacancy, and debt service?

## When to Use
Activate this skill when an investor requests risk analysis, scenario stress-testing, or probabilistic ROI forecasting for South Florida real estate acquisitions.

## Required Inputs
- `purchase_price`: Total acquisition price ($1,000,000).
- `down_payment`: Initial equity down payment ($200,000).
- `mean_rent`: Expected mean monthly rental income ($6,500).
- `sd_rent`: Standard deviation of monthly rental rate ($500).
- `mean_occupancy`: Mean annual occupancy percentage (default 0.94).
- `simulations`: Number of Monte Carlo iterations (default 1000).

## Files Used
- `/analysis/south_florida_mls_data.csv`
- `/analysis/R/monte_carlo_roi.R`
- `/analysis/plumber.R` (Endpoint: `POST /monte-carlo-roi` or `POST /run-skill`)

## Method
Stochastic Monte Carlo Simulation:
1. Draw $N=1000$ random samples for rent $R_i \sim \mathcal{N}(\mu_R, \sigma_R^2)$.
2. Draw $N=1000$ samples for occupancy $O_i \sim \text{Truncated Normal}(\mu_O, \sigma_O^2, [0.70, 1.00])$.
3. Compute $N=1000$ simulated Cash-on-Cash returns:
$$\text{CoC ROI}_i = \frac{(\text{Rent}_i \times 12 \times \text{Occ}_i) - \text{Expenses} - \text{Debt Service}}{\text{Down Payment}} \times 100$$

## Procedure
1. Initialize random number generator with fixed seed `set.seed(123)`.
2. Generate $N$ stochastic iterations for rent and occupancy.
3. Compute simulated net annual cash flows and Cash-on-Cash ROI percentages.
4. Calculate mean ROI, median ROI, 5th percentile (downside risk), 95th percentile (upside potential), and probability of positive cash flow ($P(\text{Cash Flow} > 0)$).
5. Plot density histogram of simulated ROI distribution.

## Validation
- Confirm `purchase_price > 0`, `down_payment > 0`, and `down_payment <= purchase_price`.
- Ensure `simulations >= 100` and `simulations <= 10000`.
- Verify `mean_rent > 0` and `sd_rent >= 0`.

## Output
Mean ROI (%), Median ROI (%), 5th Percentile ROI (%), 95th Percentile ROI (%), Probability of Positive Cash Flow (%), and distribution plot.

## Interpretation
"Across 1,000 stochastic simulation runs, the expected mean Cash-on-Cash ROI is approximately 3.6% with a 90% confidence range of roughly [-1.6%, 8.4%]. The acquisition carries about an 88.5% probability of achieving positive annual net cash flow after debt service — the modest expected return reflects the specific financing assumptions used ($48,000/yr debt service and $18,000/yr operating expenses against a $200,000 down payment)."

## Limitation
Monte Carlo simulations rely on assumed normal probability distributions for rents and occupancy; macroeconomic black swan events or sudden HOA special assessments fall outside standard distribution variance.
