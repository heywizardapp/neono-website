export const experiments = {
  "hero_cta_copy_v1": {
    active: true,
    variants: { A: 0.5, B: 0.5 },
    goals: ["cta_click", "signup_started"],
    scope: ["/", "/pricing"],
  },
  "pricing_layout_v2": {
    active: false, 
    variants: { control: 0.5, test: 0.5 }, 
    goals: ["trial_started"]
  }
};