import React from "react";
import TestimonialCard from "./TestimonialCard";

export default {
  title: "Organisms/TestimonialCard",
  component: TestimonialCard,
};

const Template = (args) => <TestimonialCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=StoryUser",
  name: "Jane Doe",
  title: "Product Manager",
  testimonial:
    "This product significantly improved our hiring workflow. Highly recommended!",
};
