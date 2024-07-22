import { StepPhaseGradeResult } from '@/idls/backend.did'
import { Table, Typography } from '@mui/joy'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const STEP_COUNT = 12

interface Props {
  gradeResult?: StepPhaseGradeResult
}

const EvaluationResultTable: FC<Props> = ({ gradeResult }) => {
  const { t } = useTranslation()

  const renderEvaluationRow = (index: number) => (
    <tr>
      <td>
        <Typography fontWeight="lg">
          {t(`evaluation.steps.${index}`)}
        </Typography>
      </td>
      <td>0</td>
      <td>
        {gradeResult?.steps_grade_results[index]?.grade_avg?.toFixed(2) ||
          'N/A'}
      </td>
      <td>
        {gradeResult?.steps_grade_results[index]?.grades_count.toString() ||
          'N/A'}
      </td>
      <td>Submitted</td>
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
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(STEP_COUNT)].map((_, index) => renderEvaluationRow(index))}
      </tbody>
      <tfoot>
        <tr>
          <th>Average</th>
          <th>N/A</th>
          <th>{gradeResult?.avg_result?.toFixed(2) || 'N/A'}</th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
    </Table>
  )
}

export default EvaluationResultTable
