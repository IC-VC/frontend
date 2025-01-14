export interface SNSForum {
  id: string
  projectId: number
  name: string
  logo: string
  channel: string
}

export const SNS_FORUMS: SNSForum[] = [
  {
    id: 'ICVC',
    projectId: 0,
    name: 'ICVC General discussion',
    logo: 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/root/nuywj-oaaaa-aaaaq-aadta-cai/logo.png',
    channel:
      '/community/rwbxa-nqaaa-aaaaf-bifjq-cai/channel/210512813903665502637022972014400610340',
  },
  {
    id: 'Paca',
    projectId: 3,
    name: 'Paca Project discussions',
    logo: 'https://icvc-s3-uploads.s3.eu-central-1.amazonaws.com/projects/3/0/0/Logo',
    channel: '/community/rwbxa-nqaaa-aaaaf-bifjq-cai/channel/2929728589',
  },
  {
    id: 'The Metatribes',
    projectId: 2,
    name: 'The Metatribes Project discussion',
    logo: 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/root/nuywj-oaaaa-aaaaq-aadta-cai/logo.png',
    channel: '/community/rwbxa-nqaaa-aaaaf-bifjq-cai/channel/658953515',
  },
]
