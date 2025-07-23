import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { initialise } from '@open-ic/openchat-xframe'
import { OpenChatXFrame } from '@open-ic/openchat-xframe/lib/types'
import { useParams } from 'react-router-dom'
import { SNS_FORUMS } from '@/utils/forumConfig'
import { Sheet, Stack } from '@mui/joy'

const ProjectSidebarForum = () => {
  const { projectId } = useParams()

  const chatRef = useRef()
  const [chatClient, setChatClient] = useState<OpenChatXFrame>()

  const channelId = useMemo(() => {
    return SNS_FORUMS.find((forum) => `${forum.projectId}` == projectId)
      ?.channelId
  }, [SNS_FORUMS, projectId])

  useEffect(() => {
    if (!chatRef.current || !channelId) return

    const fullUrl = `/community/rwbxa-nqaaa-aaaaf-bifjq-cai/channel/${channelId}`

    initialise(chatRef?.current, {
      targetOrigin: 'https://oc.app',
      initialPath: fullUrl,
      theme: {
        name: 'signals',
        base: 'light',
        overrides: {
          entry: {
            bg: 'white',
            input: {
              bg: 'white',
              bd: 'black',
            },
          },
          chatSummary: {
            'bg-selected': '#F4F4F5',
          },
        },
      },
      settings: {
        disableLeftNav: true,
      },
    })
      .then(setChatClient)
      .catch(console.log)
  }, [chatRef, channelId])

  if (!channelId) return

  return (
    <Stack
      mt={2}
      component={Sheet}
      boxShadow="lg"
      variant="outlined"
      borderRadius={10}
      overflow="hidden"
    >
      <iframe
        style={{ flex: 1, minHeight: 800 }}
        ref={chatRef}
        frameborder="0"
      />
    </Stack>
  )
}

export default ProjectSidebarForum
