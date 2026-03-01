import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getTitleById, getChapter } from '../mock/titles'
import ReaderView from '../components/ReaderView'
import { useReadingProgress } from '../context/ReadingProgressContext'

export default function ReaderPage() {
  const { id, num } = useParams()
  const navigate = useNavigate()
  const { setLastRead } = useReadingProgress()
  const title = getTitleById(id)
  const chapterNum = parseInt(num, 10)

  const chapter = title ? getChapter(id, chapterNum) : null

  useEffect(() => {
    if (title && chapterNum && chapter) setLastRead(id, chapterNum)
  }, [id, chapterNum, title, chapter, setLastRead])

  if (!title || isNaN(chapterNum)) {
    return <Navigate to="/" replace />
  }

  if (!chapter) {
    return <Navigate to={`/title/${id}`} replace />
  }

  const chapters = title.chapters || []
  const sortedChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber)
  const minCh = sortedChapters[0]?.chapterNumber ?? 0
  const maxCh = sortedChapters[sortedChapters.length - 1]?.chapterNumber ?? 0

  const hasPrev = chapterNum > minCh
  const hasNext = chapterNum < maxCh

  const chapterList = sortedChapters.map((c) => ({
    chapterNumber: c.chapterNumber,
    title: c.title,
  }))

  return (
    <ReaderView
      titleId={id}
      titleName={title.title}
      chapterNumber={chapterNum}
      chapterTitle={chapter.title}
      chapters={chapterList}
      hasPrev={hasPrev}
      hasNext={hasNext}
      onPrev={hasPrev ? () => navigate(`/title/${id}/chapter/${chapterNum - 1}`) : undefined}
      onNext={hasNext ? () => navigate(`/title/${id}/chapter/${chapterNum + 1}`) : undefined}
    />
  )
}
