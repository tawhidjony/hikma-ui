import React from "react";

export interface UiButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
}