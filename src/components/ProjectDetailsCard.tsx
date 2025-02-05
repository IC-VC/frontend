import { Avatar, Chip, Sheet, Stack, Typography } from '@mui/joy'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  logo?: string | null
  title?: string
  moto?: string
  amountRaising?: number
  projectStatus?: string
}

const ProjectDetailsCard: FC<Props> = ({
  logo,
  title,
  moto,
  amountRaising,
  projectStatus,
}) => {
  const { t } = useTranslation()

  return (
    <Stack
      bgcolor={(theme) => theme.palette.background.body}
      component={Sheet}
      variant="outlined"
      boxShadow="lg"
      borderRadius={10}
      p={2}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src={logo} />
        <Stack>
          <Typography level="h4">{title}</Typography>
          <Typography level="body-md">{moto}</Typography>
        </Stack>
      </Stack>
      <Stack
        mt={5}
        justifyContent="space-between"
        direction="row"
        alignItems="center"
      >
        <Stack>
          <Typography level="body-sm">Size of Round</Typography>
          <Typography level="h4" fontWeight="lg">
            $ {amountRaising?.toLocaleString()}
          </Typography>
        </Stack>
        <Stack>
          <Chip>{t(`projectStatuses.${projectStatus}`)}</Chip>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProjectDetailsCard
