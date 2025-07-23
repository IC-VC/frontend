export interface SNSForum {
  id: string
  projectId: number
  name: string
  channelId: string
}

export const SNS_FORUMS: SNSForum[] = [
  {
    id: 'ICVC',
    projectId: 0,
    name: 'ICVC General discussion',
    channelId: '210512813903665502637022972014400610340',
  },
  {
    id: 'Paca',
    projectId: 3,
    name: 'Paca Project discussions',
    channelId: '2929728589',
  },
  {
    id: 'The Metatribes',
    projectId: 2,
    name: 'The Metatribes Project discussion',
    channelId: '658953515',
  },
  {
    id: 'OfficeX',
    projectId: 7,
    name: 'OfficeX Project discussion',
    channelId: '424899609',
  },
  {
    id: 'Loka Mining',
    projectId: 6,
    name: 'Loka Mining Project discussion',
    channelId: '1148269951',
  },
  {
    id: 'Just Boobs',
    projectId: 4,
    name: 'Just Boobs Project discussion',
    channelId: '2316157900',
  },
  {
    id: 'TACO DAO',
    projectId: 5,
    name: 'TACO DAO Project discussion',
    channelId: '1510644717',
  },
  {
    id: 'Ledn',
    projectId: 10,
    name: 'Ledn Project discussion',
    channelId: '3957973565',
  },
  {
    id: 'MoonlightCube Games',
    projectId: 8,
    name: 'MoonlightCube Games Project discussion',
    channelId: '489958505',
  },
]
