'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import twiterLogo from '@/public/images/icons/x-twitter.svg'
import twiterDarkLogo from '@/public/images/icons/x-twitter-dark.svg'
import youtubeLogo from '@/public/images/icons/youtube.svg'
import youtubeDarkLogo from '@/public/images/icons/youtube-dark.svg'
import facebookLogo from '@/public/images/icons/facebook.svg'
import facebookDarkLogo from '@/public/images/icons/facebook-dark.svg'
import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'

interface SocialLink {
  platform: string
  page_url: string
}

interface TeamMember {
  name: string
  designation: string
  bio: string
  image?: string
  socials: SocialLink[]
}
const Team = ({ teamData }: { teamData: TeamMember[] }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Initialize selectedMember when teamData is available
  useEffect(() => {
    if (teamData?.length > 0 && !selectedMember) {
      setSelectedMember(teamData[0])
    }
  }, [teamData, selectedMember])

  const handleMemberChange = (member: TeamMember) => {
    if (!member || member.name === selectedMember?.name) return

    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedMember(member)
      setIsTransitioning(false)
    }, 300)
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return {
          light: twiterLogo,
          dark: twiterDarkLogo,
          alt: 'Twitter',
        }
      case 'youtube':
        return {
          light: youtubeLogo,
          dark: youtubeDarkLogo,
          alt: 'YouTube',
        }
      case 'facebook':
        return {
          light: facebookLogo,
          dark: facebookDarkLogo,
          alt: 'Facebook',
        }
      default:
        return null
    }
  }

  if (!teamData || teamData.length === 0) {
    return <div className="container py-10 text-center">No team members found</div>
  }

  if (!selectedMember) {
    return <div className="container py-10 text-center">Loading...</div>
  }

  return (
    <section className="relative overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <RevealWrapper className="container">
        {/* Main profile card */}
        <div
          className={`our-team-details flex flex-col gap-10 gap-x-[30px] border bg-backgroundBody p-5 dark:border-dark dark:bg-[#F54BB4] max-md:items-center max-md:justify-center lg:flex-row lg:p-10 ${isTransitioning ? 'transitioning' : ''}`}>
          {/* <figure className="max-lg:w-full lg:min-h-[372px] lg:min-w-[330px]">
            <Image
              src={selectedMember.image}
              width={330}
              height={372}
              alt={selectedMember.name}
              className="w-full object-cover"
            />
          </figure> */}

          <div className="flex-1">
            <div className="mb-5 flex flex-col justify-between gap-y-10 md:flex-row lg:mb-10">
              <div>
                <h2 className="mb-3 lg:text-4xl lg:leading-[1.2] lg:-tracking-[1.08px]">{selectedMember?.name}</h2>
                <p className="text-lg font-light leading-[20px]">{selectedMember?.designation}</p>
              </div>

              <ul className="flex gap-5">
                {selectedMember.socials?.map((social, i) => {
                  const icon = getSocialIcon(social.platform)
                  return icon ? (
                    <li key={i}>
                      <Link
                        href={social.page_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-200 ease-in-out hover:-translate-y-1">
                        <Image src={icon.light} alt={icon.alt} width={24} height={24} className="inline dark:hidden" />
                        <Image src={icon.dark} alt={icon.alt} width={24} height={24} className="hidden dark:inline" />
                      </Link>
                    </li>
                  ) : null
                })}
              </ul>
            </div>

            <div className="max-w-[730px] border-t pt-5 dark:border-dark lg:pt-10">
              <p>{selectedMember?.bio}</p>
            </div>
          </div>
        </div>

        {/* Team member tabs */}
        <div className="mt-[30px] flex justify-center gap-6 max-xl:flex-wrap">
          {teamData?.map((member, i) => (
            <div
              key={i}
              onClick={() => handleMemberChange(member)}
              className={`tab-member flex h-auto w-full items-center gap-5 border p-5 dark:border-dark 2xl:max-w-[370px] ${
                selectedMember?.name === member?.name ? 'tab-active' : ''
              }`}>
              <div className="text-left">
                <h3 className="mb-3 text-nowrap text-2xl leading-[1.2] tracking-[-0.72px]">{member?.name}</h3>
                <p className={`tab-member ${selectedMember?.name === member?.name ? 'tab-active' : ''}`}>{member?.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </RevealWrapper>
    </section>
  )
}

export default Team
