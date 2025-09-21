import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { DebugConsole } from '@/components/DebugConsole';
import { DebugProvider } from '@/utils/debug';
import { render } from '@/utils/test-utils';

describe('DebugConsole', () => {
  it('toggles debug state', async () => {
    const user = userEvent.setup();
    render(
      <DebugProvider>
        <DebugConsole />
      </DebugProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /debug mode/i });
    await user.click(toggleButton);

    expect(screen.getByRole('button', { name: /exit debug/i })).toBeInTheDocument();
  });
});
