import { useState } from 'react'
import Intro from './components/Intro'
import Hero from './components/Hero'
import WeddingData from './components/WeddingData'
import Invitation from './components/Invitation'
import FullPhoto from './components/FullPhoto'
import Ceremony from './components/Ceremony'
import Reception from './components/Reception'
import Timeline from './components/Timeline'
import Countdown from './components/Countdown'
import DressCode from './components/DressCode'
import NoKids from './components/NoKids'
import Gallery from './components/Gallery'
import Gifts from './components/Gifts'
import RSVPButton from './components/RSVPButton'
import FinalPhotos from './components/FinalPhotos'
import Footer from './components/Footer'
import MusicButton from './components/MusicButton'
import NavDots from './components/NavDots'
import SideDecorations from './components/SideDecorations'

import foto1 from './assets/photos/foto1.jpeg'
import foto2 from './assets/photos/foto2.jpeg'

const SECTION_IDS = [
  's-hero', 's-boda', 's-invitacion', 's-foto1', 's-ceremonia',
  's-recepcion', 's-foto2', 's-itinerario', 's-countdown',
  's-vestimenta', 's-nokids', 's-galeria', 's-regalos', 's-rsvp',
  's-fotos-finales', 's-footer',
]

const SECTION_LABELS = [
  'Inicio', 'Boda', 'Invitación', 'Foto', 'Ceremonia',
  'Recepción', 'Foto 2', 'Itinerario', 'Countdown',
  'Vestimenta', 'No niños', 'Galería', 'Regalos', 'RSVP',
  'Fotos finales', 'Footer',
]

export default function App() {
  const [showLanding, setShowLanding] = useState(false)

  return (
    <>
      {!showLanding && (
        <Intro onOpen={() => setShowLanding(true)} />
      )}
      {showLanding && (
        <div className="landing-wrapper">
          <div id="s-hero"><Hero /></div>
          <div id="s-boda"><WeddingData /></div>
          <div id="s-invitacion"><Invitation /></div>
          <div id="s-foto1"><FullPhoto src={foto1} position="center 60%" /></div>
          <div id="s-ceremonia"><Ceremony /></div>
          <div id="s-recepcion"><Reception /></div>
          <div id="s-foto2"><FullPhoto src={foto2} position="center 30%" /></div>
          <div id="s-itinerario"><Timeline /></div>
          <div id="s-countdown"><Countdown /></div>
          <div id="s-vestimenta"><DressCode /></div>
          <div id="s-nokids"><NoKids /></div>
          <div id="s-galeria"><Gallery /></div>
          <div id="s-regalos"><Gifts /></div>
          <div id="s-rsvp"><RSVPButton /></div>
          <div id="s-fotos-finales"><FinalPhotos /></div>
          <div id="s-footer"><Footer /></div>
          <MusicButton />
          <NavDots sectionIds={SECTION_IDS} labels={SECTION_LABELS} />
          <SideDecorations />
        </div>
      )}
    </>
  )
}
