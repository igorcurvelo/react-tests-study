import { render, fireEvent, waitFor, waitForElementToBeRemoved, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

// test('sum', () => {
//   const { getByText } = render(<App />);

//   expect(getByText('Hello World')).toBeTruthy()
// })

// test('sum', () => {
//   const { getByText } = render(<App />);

//   expect(getByText('Hello World')).toBeInTheDocument(); 
//   expect(getByText('Hello World')).toHaveAttribute('class', 'test');
// })

// test('sum', () => {
//   const { getByTestId } = render(<App />);

//   expect(getByTestId('apptest')).toBeInTheDocument(); 
//   expect(getByTestId('apptest')).toHaveAttribute('class', 'test');
// })

describe('List Component', () => {
  it('should render list items', () => {
    const { getByText, rerender, queryByText } = render(<List initialItems={['Igor', 'Curvelo', 'Silva']} />);

    expect(getByText('Igor')).toBeInTheDocument();
    expect(getByText('Curvelo')).toBeInTheDocument();
    expect(getByText('Silva')).toBeInTheDocument();

    // rerender(<List initialItems={['Clarinha']} />)

    // expect(getByText('Clarinha')).toBeInTheDocument();
    // expect(queryByText('Igor')).not.toBeInTheDocument();
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, debug, getByPlaceholderText, findByText } = render(<List initialItems={[]}/>);

    const addButton = getByText('Adicionar');
    const input = getByPlaceholderText('novo item');

    debug()

    userEvent.type(input, 'Novo');

    // fireEvent(addButton, 'click')
    userEvent.click(addButton);

    debug()

    // expect(getByText('Novo')).toBeInTheDocument();
    expect(await findByText('Novo')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('Novo')).toBeInTheDocument();
    });
  });

  it('should be able to remove item from the list', async () => {
    const { getAllByText, queryByText } = render(<List initialItems={['Igor']}/>);

    const removeButtons = getAllByText('remover');

    userEvent.click(removeButtons[0]);

    // await waitForElementToBeRemoved(getByText('Igor'));

    // await waitForElementToBeRemoved(() => {
    //   return getByText('Igor');
    // });

    await waitFor(() => {
      expect(queryByText('Igor')).not.toBeInTheDocument();
    })
  })
});