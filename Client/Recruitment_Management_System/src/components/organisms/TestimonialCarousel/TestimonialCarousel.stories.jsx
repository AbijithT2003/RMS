import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";

export default {
  title: "Organisms/TestimonialCarousel",
  component: TestimonialCarousel,
};

const sample = [
  {
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    name: "Alice",
    title: "Engineer",
    testimonial: "Great platform — fast to set up and easy to use.",
  },
  {
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    name: "Bob",
    title: "Recruiter",
    testimonial: "Helped our team reduce time-to-hire significantly.",
  },
  {
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    name: "Carol",
    title: "HR",
    testimonial: "The UI is intuitive and powerful.",
  },
  {
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dave",
    name: "Dave",
    title: "CTO",
    testimonial: "Solid feature set for a small team.",
  },
];

const Template = (args) => <TestimonialCarousel {...args} />;

export const Default = Template.bind({});
Default.args = {
  testimonials: sample,
};
