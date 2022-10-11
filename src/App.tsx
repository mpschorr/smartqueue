import { useState } from 'react'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'

import isongs from './assets/songs.json'
const songs = isongs as Song[]

interface Song {
  name: string
  artist: string
  album: string
}

function App() {
  const [queue, setQueue] = useState(songs)
  const [shuffled, setShuffled] = useState(false)

  function toggleShuffled() {
    // let songQueue = queue as Song[]
    if (!shuffled) {
      setQueue(calculateShuffle(queue))
    } else {
      setQueue(songs)
    }
    setShuffled(!shuffled)
  }

  function calculateShuffle(queue: Song[]): Song[] {
    let clone = [...queue]
    let currentIndex = clone.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [clone[currentIndex], clone[randomIndex]] = [
        clone[randomIndex], clone[currentIndex]]
    }
    return clone
  }

  return (
    <div className="App">
      <div className={`toggle ` + (shuffled ? 'on' : 'off')} onClick={toggleShuffled}>
        {/* <input type="checkbox" onChange={toggleShuffled}></input> */}
        <FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon>
        {/* </div> */}
      </div>

      <hr></hr>

      <ul>
      {
        queue.map((song) => {
          return(
            <li key={`${song.artist}|${song.name}`}>
              <p>
                {song.artist} - {song.name}
              </p>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default App
