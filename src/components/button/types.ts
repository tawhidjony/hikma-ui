import React from "react";

export interface UiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  varient?: 'primary' | 'secondary' | 'outline' | 'success';
  size?: 'small' | 'medium' | 'large';
} 