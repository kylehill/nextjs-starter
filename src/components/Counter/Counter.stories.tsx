import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Counter } from "./Counter";

const meta = {
  title: "Components/Counter",
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AtMinimum: Story = {
  args: { initialCount: 0, min: 0, max: 10 },
};

export const AtMaximum: Story = {
  args: { initialCount: 10, min: 0, max: 10 },
};
