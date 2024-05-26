import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import UiButton from '.';

const meta = {
  title: 'components/UiButton',
  component: UiButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children:{
        description:"Click Me",
        control:{
            type:"text"
        }
    },
    primary:{
      control:{
        type:"boolean"
      }
    },
    size:{
      control:{
        type:"select",
        options: ['small', 'medium', 'large'],
      }
    }
  },
  args: { onClick: fn() },
} satisfies Meta<typeof UiButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButton:Story = {
    args:{
      children:"Hello",
      primary: false
    }
}