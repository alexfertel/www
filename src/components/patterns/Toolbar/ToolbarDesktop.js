import { Choose, Toolbar, Flex, Box, Fixed } from 'components/elements'
import { GitHub, Twitter } from 'components/icons'
import { useLocation } from '@reach/router'
import React, { useState } from 'react'
import { rgba } from 'polished'
import { colors } from 'theme'
import { css } from 'styled-components'

import NavContainer from './NavContainer'

import {
  NavChangelog,
  NavChat,
  NavDevelopers,
  NavDocs,
  NavGitHub,
  NavInsights,
  NavLogo,
  NavMeta,
  NavOpenSource,
  NavPdf,
  NavPricing,
  NavProducts,
  NavRecipes,
  NavScreenshot,
  NavSDK,
  NavTwitter
} from '../Toolbar/ToolbarLinks'

const iconLight = css`
  color: ${colors.black50};
  &:hover {
    color: ${colors.black80};
  }
`

const iconDark = css`
  color: ${colors.white50};
  &:hover {
    color: ${colors.white80};
  }
`

const ToolbarSecondary = ({ isDark, children }) => (
  <Toolbar type='secondary' aria-label='Secondary Navigation'>
    <Flex as='ul' alignItems='center' justifyContent='center' m={0} p={0}>
      <NavContainer as='li' py={2} pr={3} isDark={isDark}>
        {children}
      </NavContainer>
    </Flex>
  </Toolbar>
)

const ToolbarDesktop = ({ theme }) => {
  const isDark = theme === 'dark'
  const location = useLocation()

  const [secondary, setSecondary] = useState(() => {
    const { pathname } = location

    if (NavProducts.pages.some(pagePath => pathname.startsWith(pagePath))) {
      return 'products'
    }

    if (NavDevelopers.pages.some(pagePath => pathname.startsWith(pagePath))) {
      return 'developers'
    }

    return ''
  })

  const setToolbar = name => () => setSecondary(name)

  return (
    <Fixed
      zIndex={101}
      top={0}
      left={0}
      right={0}
      css={`
        backdrop-filter: blur(8px);
        background-color: ${rgba(isDark ? 'black' : 'white', 0.5)};
      `}
    >
      <Box px={3}>
        <Toolbar aria-label='Primary Navigation' justifyContent='space-between'>
          <NavContainer as='span'>
            <NavLogo p={1} />
          </NavContainer>
          <NavContainer as='nav'>
            <Flex
              as='ul'
              alignItems='center'
              justifyContent='center'
              p={0}
              m={0}
            >
              <NavProducts
                as='li'
                pl={0}
                isDark={isDark}
                onClick={setToolbar('products')}
              />
              <NavDevelopers
                as='li'
                isDark={isDark}
                onClick={setToolbar('developers')}
              />
              <NavPricing as='li' isDark={isDark} />
            </Flex>
          </NavContainer>
          <NavContainer as='div'>
            <NavTwitter css={isDark ? iconDark : iconLight}>
              <Twitter />
            </NavTwitter>
            <NavGitHub pl={3} css={isDark ? iconDark : iconLight}>
              <GitHub />
            </NavGitHub>
          </NavContainer>
        </Toolbar>
        <Choose>
          <Choose.When condition={secondary === 'products'}>
            <ToolbarSecondary>
              <NavMeta pl={0} fontSize='12px' />
              <NavSDK fontSize='12px' />
              <NavPdf fontSize='12px' />
              <NavScreenshot fontSize='12px' />
              <NavInsights fontSize='12px' />
            </ToolbarSecondary>
          </Choose.When>
          <Choose.When condition={secondary === 'developers'}>
            <ToolbarSecondary>
              <NavDocs pl={0} fontSize='12px' />
              <NavRecipes fontSize='12px' />
              <NavOpenSource fontSize='12px' />
              <NavChangelog fontSize='12px' />
              <NavChat fontSize='12px' />
            </ToolbarSecondary>
          </Choose.When>
        </Choose>
      </Box>
    </Fixed>
  )
}

export default ToolbarDesktop
