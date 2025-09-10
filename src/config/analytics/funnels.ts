export const funnels = [
  {
    id: "trial_signup",
    name: "Trial Signup Flow",
    windowSec: 3600,
    steps: [
      { event: "page_view", where: { path: "/" } },
      { event: "click", where: { id: "hero_start_trial" } },
      { event: "form_submit", where: { form: "signup" } },
    ],
  },
  {
    id: "pricing_to_roi",
    name: "Pricing to ROI Calculator",
    windowSec: 1800,
    steps: [
      { event: "page_view", where: { path: "/pricing" } },
      { event: "click", where: { id: "open_roi" } },
      { event: "page_view", where: { path: "/roi" } },
    ]
  }
];