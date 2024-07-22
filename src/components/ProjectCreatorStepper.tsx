import React, { FC } from 'react'
import {
  Step,
  StepIndicator,
  Stepper,
  Typography,
  stepClasses,
  stepIndicatorClasses,
  typographyClasses,
} from '@mui/joy'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import HowToVoteIcon from '@mui/icons-material/HowToVote'

interface Props {
  currentStep: number
}

interface Step {
  title: string
  description?: string
  requiresUserAction: boolean
}

const STEPS: Step[] = [
  {
    title: 'Submit project',
    description: 'Fill in basic project details',
    requiresUserAction: true,
  },
  {
    title: 'Get accepted via SNS vote',
    description:
      'Community votes on accepting your project to ICVC selection process',
    requiresUserAction: false,
  },
  { title: 'Submit extended project application', requiresUserAction: true },
  {
    title: 'Evaluation Phase',
    description:
      'Community members will evaluate your extended application and cast their votes',
    requiresUserAction: false,
  },
  {
    title: 'Completion Phase',
    description:
      'For projects succesfully passing minimal threshold Completion Phase will be available',
    requiresUserAction: true,
  },
  {
    title: 'Fund disbursement (SNS) vote',
    description: 'This is final vote for disbursing Funds to your project',
    requiresUserAction: false,
  },
]

const ProjectCreatorStepper: FC<Props> = ({ currentStep }) => {
  const renderStep = (step: Step, index: number) => {
    const isComplete = index < currentStep
    const isActive = index === currentStep

    const indicator = isActive ? (
      <StepIndicator variant="solid" color="primary">
        {step.requiresUserAction ? (
          <AppRegistrationRoundedIcon />
        ) : (
          <HowToVoteIcon />
        )}
      </StepIndicator>
    ) : isComplete ? (
      <StepIndicator variant="solid" color="success">
        <CheckRoundedIcon />
      </StepIndicator>
    ) : (
      <StepIndicator>{index + 1}</StepIndicator>
    )

    return (
      <Step
        completed={isComplete}
        active={isActive}
        indicator={indicator}
        disabled={index > currentStep}
      >
        <div>
          <Typography level="title-md">{step.title}</Typography>
          <Typography level="body-sm">{step.description}</Typography>
        </div>
      </Step>
    )
  }

  return (
    <Stepper
      sx={{
        '--Stepper-verticalGap': '2.5rem',
        '--StepIndicator-size': '2.5rem',
        '--Step-gap': '1rem',
        '--Step-connectorInset': '0.5rem',
        '--Step-connectorRadius': '1rem',
        '--Step-connectorThickness': '4px',
        '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
        [`& .${stepClasses.completed}`]: {
          '&::after': { bgcolor: 'success.solidBg' },
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            border: '4px solid',
            borderColor: '#fff',
            boxShadow: (theme) =>
              `0 0 0 1px ${theme.vars.palette.primary[500]}`,
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          color: 'neutral.softDisabledColor',
        },
        [`& .${typographyClasses['title-sm']}`]: {
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '10px',
        },
      }}
      orientation="vertical"
    >
      {STEPS.map(renderStep)}
    </Stepper>
  )
}

export default ProjectCreatorStepper
