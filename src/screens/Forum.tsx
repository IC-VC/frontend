import { Box, Stack, Typography, useTheme } from '@mui/joy'
import { useEffect, useRef, useState } from 'react'
import { initialise } from '@open-ic/openchat-xframe'
import { OpenChatXFrame } from '@open-ic/openchat-xframe/lib/types'
import { SNS_FORUMS, SNSForum } from '@/utils/forumConfig'

const Forum = () => {
  const chatRef = useRef()
  const [selectedProject, setSelectedProject] = useState<SNSForum>(
    SNS_FORUMS[0]
  )
  const [chatClient, setChatClient] = useState<OpenChatXFrame>()

  const theme = useTheme()

  useEffect(() => {
    if (!chatRef.current) return
    initialise(chatRef?.current, {
      targetOrigin: 'https://oc.app',
      initialPath:
        '/community/rwbxa-nqaaa-aaaaf-bifjq-cai/channel/210512813903665502637022972014400610340',
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
  }, [chatRef, theme])

  return (
    <Stack m={2} flex={1} alignItems="center">
      <Stack
        border={2}
        color={(theme) => theme.palette.border.primary}
        mb={3}
        borderRadius={10}
        overflow="hidden"
        direction="row"
        flex={1}
        width={800}
      >
        <Stack
          xs={0.5}
          borderRight={2}
          color={(theme) => theme.palette.border.primary}
        >
          <Stack
            spacing={2}
            px={2}
            py={1}
            bgcolor={(theme) => theme.palette.primary}
          >
            {SNS_FORUMS.map((forum) => (
              <Stack alignItems="center">
                <Stack
                  bgcolor={(theme) =>
                    selectedProject?.id === forum.id &&
                    theme.palette.common.black
                  }
                  borderRadius={5}
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                >
                  <img
                    onClick={() => {
                      chatClient?.changePath(
                        `https://oc.app/community/rwbxa-nqaaa-aaaaf-bifjq-cai/channel/${forum.channelId}`
                      )
                      setSelectedProject(forum)
                    }}
                    src={
                      forum.projectId === 0
                        ? 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/root/nuywj-oaaaa-aaaaq-aadta-cai/logo.png'
                        : `https://icvc-s3-uploads.s3.eu-central-1.amazonaws.com/projects/${forum.projectId}/0/0/Logo`
                    }
                    width={30}
                    height={30}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack flex={1}>
          <Box borderBottom={1} borderColor="black" p={2}>
            <Typography level="h4">{selectedProject?.name}</Typography>
          </Box>
          <iframe
            style={{ maxWidth: 760, flex: 1 }}
            ref={chatRef}
            frameborder="0"
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Forum
