import type { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast";
import { useState } from "react";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["success", "error", "warning"],
    },
    message: { control: "text" },
  },
  args: {
    message: "This is a toast message",
    type: "success",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ✅ Wrapper to handle onClose
const ToastWrapper = (args: any) => {
  const [visible, setVisible] = useState(true);
  return visible ? <Toast {...args} onClose={() => setVisible(false)} /> : null;
};

export const Success: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    type: "success",
    message: "Operation successful!",
  },
};

export const Error: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    type: "error",
    message: "Something went wrong!",
  },
};

export const Warning: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    type: "warning",
    message: "Please check your input!",
  },
};
