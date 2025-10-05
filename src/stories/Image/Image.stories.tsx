import type { Meta, StoryObj } from "@storybook/react";
import Image from "./Image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  args: {
    alt: "Sample Image",
    width: 300,
    height: 200,
    className: "rounded-md object-cover",
    fallbackSrc: "/assets/images/placeholder.jpg",
  },
  argTypes: {
    src: { control: "text" },
    unoptimized: { control: "boolean" },
    placeholder: { control: "select", options: ["blur", "empty"] },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const ValidImage: Story = {
  args: {
    src: "https://placehold.co/600x400",
  },
};

export const InvalidImage: Story = {
  args: {
    src: "invalid-url",
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://example.com/non-existent.jpg",
  },
};

export const UnoptimizedImage: Story = {
  args: {
    src: "https://placehold.co/600x400",
    unoptimized: true,
  },
};
