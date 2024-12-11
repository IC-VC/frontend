import { UserGrade } from '@/hooks/useProject'
import { StepPhaseGradeResult } from '@/idls/backend.did'
import { Table, Typography } from '@mui/joy'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const STEP_COUNT = 12

interface Props {
  gradeResult?: StepPhaseGradeResult
  userGrades?: UserGrade[]
}

const EvaluationResultTable: FC<Props> = ({ gradeResult, userGrades }) => {
  const { t } = useTranslation()

  const totalUserGrades = useMemo(() => {
    return (userGrades || []).reduce((acc, grade) => acc + grade.grade, 0)
  }, [userGrades])

  const renderEvaluationRow = (index: number) => (
    <tr>
      <td>
        <Typography fontWeight="lg">
          {t(`evaluation.steps.${index}`)}
        </Typography>
      </td>
      <td>{userGrades?.find((g) => g.stepId === index)?.grade || '0'}</td>
      <td>
        {gradeResult?.steps_grade_results[index]?.grade_avg?.toFixed(2) || '0'}
      </td>
      <td>
        {gradeResult?.steps_grade_results[index]?.grades_count.toString() ||
          '0'}
      </td>
    </tr>
  )

  return (
    <Table stickyHeader stickyFooter>
      <thead>
        <tr>
          <th>Step</th>
          <th>Your Grade</th>
          <th>Avrg Grade</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(STEP_COUNT)].map((_, index) => renderEvaluationRow(index))}
      </tbody>
      <tfoot>
        <tr>
          <th>Average</th>
          <th>{(totalUserGrades / STEP_COUNT).toFixed(2)}</th>
          <th>{gradeResult?.avg_result?.toFixed(2) || '0'}</th>
          <th></th>
        </tr>
      </tfoot>
    </Table>
  )
}

export default EvaluationResultTable
