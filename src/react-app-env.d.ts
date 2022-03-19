/// <reference types="react-scripts" />

interface Track {
  title: string
  url: string
  artists: string
  duration: string
  thumbnail: string
  album: string
  isExplicit: boolean
  searchKey: string
}
interface Playlist {
  id: string
  title: string
  description: string
  thumbnail: string
  author: string
  year: string
  duration: string
  trackCount: number
  tracks: Track[]
}