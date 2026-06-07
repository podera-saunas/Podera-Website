import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { Home } from './components/Home';
import { Info } from './components/Info';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'info', Component: Info },
      { path: 'gallery', Component: Gallery },
      { path: 'contact', Component: Contact },
    ],
  },
]);
