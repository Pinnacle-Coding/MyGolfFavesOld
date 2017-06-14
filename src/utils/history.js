import { createMemoryHistory } from 'history'

const history = createMemoryHistory({
  initialEntries: [ '/home' ], 
  initialIndex: 0
});

export default history
