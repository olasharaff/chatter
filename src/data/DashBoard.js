import React from 'react'
import feed from '../assets/img/Iconsax/Linear/Vector.svg'
import team from '../assets/img/Vector-1.svg'
import draft from '../assets/img/Vector-2.svg'
import analytic from '../assets/img/analytic.svg'
import bookmark from '../assets/img/Vector.svg'
import { IoPersonOutline, IoNotificationsOutline } from "react-icons/io5";

const Overview = [
  {
    id: 1,
    icon: feed,
    text: 'Feed',
    url: '/dashboard',
  },
  {
    id: 2,
    icon: bookmark,
    text: 'Bookmarks',
    url: '/bookmark',
  },
  {
    id: 3,
    icon: team,
    text: 'Team blogs',
    url: '/team-blog',
  },
  {
    id: 4,
    icon: draft,
    text: 'Draft',
    url: '/Draft',
  },
  {
    id: 5,
    icon: analytic,
    text: 'Analytics',
    url: '/posting/:id',
  },
]

const TrendingTags = [
    {
        id: 1,
        text: 'Programming',
        url: '/programming'

    },
    {
        id: 2,
        text: 'Data Science',
        url: '/data-science'
    },
    {
        id: 3,
        text: 'Technology',
        url: '/technology'
    },
    {
        id: 4,
        text: 'Machine Learning',
        url: '/machine-learning'
    },
    {
        id: 5,
        text: 'Politics',
        url: '/politics'
    },
    {
        id:6,   
        text: 'See All',
        url: '/see-all'
    }
]

const Personal = [
    {
        id: 1,
        text: 'Account',
        url: '/account',
        icon: <IoPersonOutline/>
    },
    {
        id: 2,
        text: 'Notification',
        url: '/notification',
          icon: <IoNotificationsOutline/>   
    }
]

export { Overview, TrendingTags, Personal };