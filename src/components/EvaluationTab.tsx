import { Stack, Tab, TabList, Tabs } from '@mui/joy'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  currentStep: number
  setCurrentStep: (step: number) => void
}

const STEP_COUNT = 12

const EvaluationTab: FC<Props> = ({ currentStep, setCurrentStep }) => {
  const { t } = useTranslation()

  return (
    <Stack mb={1} borderRadius={10} overflow="hidden">
      <Tabs
        value={currentStep}
        onChange={(_, index) => setCurrentStep(parseInt(index))}
      >
        <TabList
          sx={{
            overflow: 'auto',
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {[...Array(STEP_COUNT)].map((_, index) => (
            <Tab
              key={index}
              value={index}
              sx={{ flex: 'none', scrollSnapAlign: 'start' }}
            >
              {t(`evaluation.steps.${index}`)}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Stack>
  )
}

export default EvaluationTab
