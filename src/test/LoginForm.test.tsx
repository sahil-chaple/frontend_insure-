import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe('LoginForm', () => {
  it('renders username and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    // Use getByRole to target specific input roles unambiguously
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it('shows error when both fields are empty on submit', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });

  it('shows only password error when username is filled', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox', { name: /username/i }), { target: { value: 'alice' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(1);
    expect(alerts[0].textContent).toMatch(/password/i);
  });

  it('calls onSubmit with credentials when both fields are filled', () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: /username/i }), { target: { value: 'alice' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith('alice', 'secret');
  });
});
