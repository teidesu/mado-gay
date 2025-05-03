/* @solid-refresh reload */
import { render } from 'solid-js/web'
import { App } from './App.tsx'

import './style.css'

const root = document.querySelector('#app')

render(App, root!)
