import feed from '../assets/img/Iconsax/Linear/Vector.svg'
import team from '../assets/img/Vector-1.svg'
import draft from '../assets/img/Vector-2.svg'
import analytic from '../assets/img/analytic.svg'
import bookmark from '../assets/img/Vector.svg'

const SideBar1 = [
    {
        id: 1,
        icon: feed ,
        text: 'Feed',
        url: '/feed'
    },
     {
        id: 2,
        icon: bookmark,
        text: 'Bookmarks',
        url: '/bookmark'
    },
     {
        id: 3,
        icon: team,
        text: 'Team blogs',
        url: '/team-blog'
    },
     {
        id: 4,
        icon:draft ,
        text: 'Draft',
        url: '/Draft'
    },
     {
        id: 5,
        icon:analytic ,
        text: 'Analytics',
        url: '/analytic'
    },
]

const SideBar2 = [
    {

    }
]

export {SideBar1, SideBar2}