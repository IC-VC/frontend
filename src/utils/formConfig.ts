import { DocumentType } from '@/idls/backend.did'
import { HTMLInputTypeAttribute } from 'react'
interface Section {
  questions: Question[]
}

export enum QuestionKind {
  RichText,
  Input,
}

export interface Question {
  id: string
  kind?: QuestionKind
  type?: HTMLInputTypeAttribute
  documentType?: DocumentType
}

export const APPLICATION_SECTIONS: Section[] = [
  {
    questions: [
      { id: 'ICVC_QUESTION_0_0_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_0_0_1', type: 'textarea' },
      { id: 'ICVC_QUESTION_0_0_2', type: 'textarea' },
      { id: 'ICVC_QUESTION_0_0_3', type: 'textarea' },
      { id: 'ICVC_QUESTION_0_0_4', type: 'textarea' },
      { id: 'ICVC_NUMERIC_DECIMAL_0_0_0', type: 'number' },
      { id: 'ICVC_QUESTION_0_0_5', type: 'textarea' },
      {
        id: 'ICVC_FILE_0_0_1',
        type: 'file',
        documentType: { PitchDeck: null },
      },
      { id: 'ICVC_FILE_0_0_2', type: 'file', documentType: { Logo: null } },
      {
        id: 'ICVC_FILE_0_0_3',
        type: 'file',
        documentType: { CoverPhoto: null },
      },
    ],
  },
]

export const EVALUATION_SECTIONS: Section[] = [
  {
    questions: [
      { id: 'ICVC_QUESTION_1_0_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_0_1', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_0_2', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_0_3', type: 'textarea' },
    ],
  },
  {
    questions: [
      { id: 'ICVC_QUESTION_1_1_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_1_1', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_1_2', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_1_3', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_1_4', type: 'textarea' },
    ],
  },
  {
    questions: [
      { id: 'ICVC_QUESTION_1_2_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_2_1', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_2_2', type: 'textarea' },
    ],
  },
  {
    questions: [
      {
        id: 'ICVC_FILE_1_3_0',
        type: 'file',
        kind: QuestionKind.Input,
        documentType: { FinancialModels: null },
      },
    ],
  },
  {
    questions: [
      { id: 'ICVC_QUESTION_1_4_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_4_1', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_4_2', type: 'textarea' },
    ],
  },
  {
    questions: [
      { id: 'ICVC_QUESTION_1_5_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_5_1', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_5_2', type: 'textarea' },
    ],
  },
  {
    questions: [
      { id: 'ICVC_QUESTION_1_6_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_6_1', type: 'textarea' },
    ],
  },
  {
    questions: [{ id: 'ICVC_QUESTION_1_7_0', type: 'textarea' }],
  },
  {
    questions: [
      { id: 'ICVC_QUESTION_1_8_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_8_1', type: 'textarea' },
    ],
  },
  {
    questions: [
      { id: 'ICVC_QUESTION_1_9_0', type: 'textarea' },
      { id: 'ICVC_CHECKBOX_1_9_0', type: 'checkbox', kind: QuestionKind.Input },
      { id: 'ICVC_CHECKBOX_1_9_1', type: 'checkbox', kind: QuestionKind.Input },
    ],
  },
  {
    questions: [
      {
        id: 'ICVC_FILE_1_10_0',
        type: 'file',
        kind: QuestionKind.Input,
        documentType: { ProductDemo: null },
      },
    ],
  },
  {
    questions: [
      {
        id: 'ICVC_FILE_1_11_0',
        type: 'file',
        kind: QuestionKind.Input,
        documentType: { ExpenditurePlan: null },
      },
      { id: 'ICVC_QUESTION_1_11_0', type: 'textarea' },
      { id: 'ICVC_QUESTION_1_11_1', type: 'textarea' },
    ],
  },
]
