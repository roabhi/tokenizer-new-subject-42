import { ProjectUser } from '../../types/42api'

/**
 * Defines the project requirements for each ring.
 */
const RING_REQUIREMENTS: Record<number, (string | string[])[]> = {
  0: ['Libft'],
  1: ['Born2beroot', 'get_next_line', 'ft_printf'],
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

  // Only consider validated projects
  const validatedProjects = projects.filter(
    (project) => project['validated?'] === true
  )

  // console.log(
  //   'All validated projects:',
  //   validatedProjects.map((p) => p.project.name)
  // )
  // console.log(`Ring ${ringNumber} requirements:`, requirements)

  const normalizeProjectName = (name: string): string => {
    const normalized = name.toLowerCase().replace(/[-_\s]/g, '')
    // console.log(`Normalizing: ${name} -> ${normalized}`)
    return normalized
  }

  return requirements.every((requirement) => {
    if (typeof requirement === 'string') {
      const hasProject = validatedProjects.some((project) => {
        const normalizedProject = normalizeProjectName(project.project.name)
        const normalizedRequirement = normalizeProjectName(requirement)
        // console.log(
        //   `Comparing: ${normalizedProject} with ${normalizedRequirement}`
        // )
        return normalizedProject === normalizedRequirement
      })
      // console.log(`Mandatory project ${requirement}: ${hasProject}`)
      return hasProject
    }

    // If it's an array, student needs to complete ONE of these projects
    const hasOneOptional = requirement.some((optionalProject) =>
      validatedProjects.some(
        (project) =>
          normalizeProjectName(project.project.name) ===
          normalizeProjectName(optionalProject)
      )
    )
    console.log(`Optional group ${requirement}: ${hasOneOptional}`)
    return hasOneOptional
  })
}
