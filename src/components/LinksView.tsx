import { Link } from '@/interfaces/project'
import { Box, Stack } from '@mui/joy'
import { FC } from 'react'
import XIcon from '../assets/x_link.png'
import GithubIcon from '../assets/github_link.png'
import LinkedInLink from '../assets/linkedin_link.png'
import WebIcon from '../assets/web_icon.png'

const ICON_MAP = {
  x: XIcon,
  github: GithubIcon,
  linkedIn: LinkedInLink,
  other: WebIcon,
}

interface Props {
  links: Link[]
}

const LinksView: FC<Props> = ({ links }) => {
  const normalizeLink = (link: string) => {
    if (!link.includes('http')) return `https://${link}`
    return link
  }

  const otherLinks = links.find((l) => l.kind === 'other')?.url.split(',') || []

  const filteredLinks = links.filter((l) => l.kind !== 'other')

  return (
    <Stack direction="row" spacing={1} mt={2}>
      {[
        ...filteredLinks,
        ...otherLinks.map((link) => ({ kind: 'other', url: link })),
      ].map((link) => (
        <a href={normalizeLink(link.url)} target="_blank">
          <Box>
            <img src={ICON_MAP[link.kind]} width={22} height={22} />
          </Box>
        </a>
      ))}
    </Stack>
  )
}

export default LinksView
