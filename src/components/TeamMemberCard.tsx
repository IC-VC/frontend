import { ProjectTeamMember } from '@/interfaces/project'
import { Avatar, Sheet, Stack, Typography } from '@mui/joy'
import { Edit, Trash } from 'lucide-react'
import React, { FC } from 'react'

interface Props {
  teamMember: ProjectTeamMember
  onEditClick?: () => void
  onDeleteClick?: () => void
}

const TeamMemberCard: FC<Props> = ({
  teamMember,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <Stack
      component={Sheet}
      variant="outlined"
      sx={{ borderRadius: 10, padding: 2 }}
      boxShadow="lg"
    >
      <Stack direction="row" alignItems="center">
        <Avatar src={teamMember.profile_picture} />
        <Stack flex={1} ml={2}>
          <Typography>
            {teamMember.first_name} {teamMember.last_name}
          </Typography>
          <Typography>{teamMember.position}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {onEditClick && <Edit size={20} onClick={onEditClick} />}
          {onDeleteClick && <Trash size={20} onClick={onDeleteClick} />}
        </Stack>
      </Stack>
      <Typography mt={2}>
        <Typography fontWeight="lg">Previously:{` `}</Typography>

        {teamMember.previous_experience}
      </Typography>
    </Stack>
  )
}

export default TeamMemberCard
