import { Stack, Tab, TabList, Tabs, Box, Typography } from '@mui/joy'
import {
  FC,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { AnimatePresence, useScroll, motion } from 'framer-motion'
import { HiArrowCircleRight, HiArrowCircleLeft } from 'react-icons/hi'

interface Props {
  currentStep: number
  setCurrentStep: (step: number) => void
}

const STEP_COUNT = 12
const SCROLL_STEP = 100

interface ScrollButtonProps extends PropsWithChildren {
  show: boolean
  onClick: () => void
}

const ScrollButton: FC<ScrollButtonProps> = ({ show, children, onClick }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <Box onClick={onClick}>{children}</Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const EvaluationTab: FC<Props> = ({ currentStep, setCurrentStep }) => {
  const scrollRef: MutableRefObject<HTMLDivElement> = useRef()
  const { scrollX } = useScroll({ container: scrollRef })
  const [currentPosition, setCurrentPosition] = useState(0)

  const { t } = useTranslation()

  useEffect(() => {
    scrollX.on('change', (scroll) => {
      setCurrentPosition(scroll)
    })
  }, [scrollX])

  const { leftButtonVisible, rightButtonVisible } = useMemo(() => {
    if (currentPosition === 0)
      return { leftButtonVisible: false, rightButtonVisible: true }

    return {
      leftButtonVisible: currentPosition > SCROLL_STEP,
      rightButtonVisible:
        (scrollRef.current?.scrollWidth || 0) -
          currentPosition -
          (scrollRef.current?.clientWidth || 0) >
        SCROLL_STEP,
    }
  }, [currentPosition, scrollRef.current])

  const scroll = (direction: string) => {
    console.log('TEST', currentPosition + SCROLL_STEP, scrollRef.current)
    scrollRef.current.scrollTo({
      left:
        direction === 'right'
          ? currentPosition + SCROLL_STEP
          : currentPosition - SCROLL_STEP,
      behavior: 'smooth',
    })
  }

  return (
    <Stack justifyContent="center" position="relative">
      <Stack
        ref={scrollRef}
        overflow="scroll"
        sx={{
          msOverflowStyle: 'none',
          '::-webkit-scrollbar': {
            width: '0px',
          },
        }}
      >
        <Stack spacing={2} direction="row">
          {[...Array(STEP_COUNT)].map((_, index) => (
            <Stack onClick={() => setCurrentStep(index)}>
              <Typography
                fontWeight={currentStep === index ? 'lg' : 'md'}
                minWidth={150}
              >
                {t(`evaluation.steps.${index}`)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack position="absolute" left={-5}>
        <ScrollButton show={leftButtonVisible} onClick={() => scroll('left')}>
          <HiArrowCircleLeft size={30} />
        </ScrollButton>
      </Stack>
      <Stack position="absolute" right={0}>
        <ScrollButton show={rightButtonVisible} onClick={() => scroll('right')}>
          <HiArrowCircleRight size={30} />
        </ScrollButton>
      </Stack>
    </Stack>
  )
}

export default EvaluationTab
