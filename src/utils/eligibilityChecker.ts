import { ProjectUser } from '../../types/42api'

/**
 * Defines the project requirements for each ring.
 */
const RING_REQUIREMENTS: Record<number, (string | string[])[]> = {
  0: ['libft'],
  1: ['born2beroot', 'get_next_line', 'printf'],
  2: [
    'exam_rank_02',
    'push_swap',
    ['minitalk', 'pipex'], // Choose one
    ['so_long', 'FdF', 'fract-ol'], // Choose one
  ],
  3: ['exam_rank_03', 'philosophers', 'minishell'],
  4: [
    'exam_rank_04',
    'net_practice',
    'CPP Module 00',
    'CPP Module 01',
    'CPP Module 02',
    'CPP Module 03',
    'CPP Module 04',
    ['cub3d', 'mini-RT'], // Choose one
  ],
  5: [
    'exam_rank_05',
    'CPP Module 05',
    'CPP Module 06',
    'CPP Module 07',
    'CPP Module 08',
    'CPP Module 09',
    'inception',
    ['ft_irc', 'webserv'], // Choose one
  ],
  6: ['exam_rank_06', 'ft_transcendence'],
}

/**
 * Check if a user is eligible for a specific ring.
 * @param ringNumber - The ring number to check.
 * @param projects - The user's completed projects.
 * @returns `true` if eligible, otherwise `false`.
 */
export const checkRingEligibility = (
  ringNumber: number,
  projects: ProjectUser[]
): boolean => {
  const requirements = RING_REQUIREMENTS[ringNumber]
  if (!requirements) return false

  return requirements.every((requirement) => {
    if (Array.isArray(requirement)) {
      // At least one project from the group must be validated
      return requirement.some((req) =>
        projects.some(
          (project) => project.project.name === req && project['validated?']
        )
      )
    } else {
      // Single project requirement
      return projects.some(
        (project) =>
          project.project.name === requirement && project['validated?']
      )
    }
  })
}
