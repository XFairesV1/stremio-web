// Copyright (C) 2017-2023 Smart code 203358507

import React, { memo } from 'react';
import classnames from 'classnames';
import { VerticalNavBar, HorizontalNavBar } from 'stremio/components/NavBar';
import { useContentGamepadNavigation, useVerticalNavGamepadNavigation } from 'stremio/services/GamepadNavigation';
import styles from './MainNavBars.less';

const TABS = [
    { id: 'board', label: 'Board', icon: 'home', href: '/' },
    { id: 'discover', label: 'Discover', icon: 'discover', href: '/discover' },
    { id: 'library', label: 'Library', icon: 'library', href: '/library' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', href: '/calendar' },
    { id: 'addons', label: 'ADDONS', icon: 'addons', href: '/addons' },
    { id: 'settings', label: 'SETTINGS', icon: 'settings', href: '/settings' },
];

type Props = {
    className: string,
    route?: string,
    query?: string,
    children?: React.ReactNode,
};

const MainNavBars = memo(({ className, route, query, children }: Props) => {
    const navRef = React.useRef(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = React.useState(false);

    const navRoute = route === 'continue_watching' ? 'library' : (route ?? '');
    useContentGamepadNavigation(contentRef, navRoute);
    useVerticalNavGamepadNavigation(navRef, navRoute);

    React.useEffect(() => {
        const container = contentRef.current;
        if (!container) {
            return;
        }

        const onScroll = (event: Event) => {
            const target = event.target as HTMLElement;
            setScrolled(typeof target.scrollTop === 'number' && target.scrollTop > 10);
        };

        // Scroll events don't bubble, so listen in the capture phase to
        // catch scrolling on whichever descendant element (e.g. the board's
        // row container) is actually scrollable for the current route.
        container.addEventListener('scroll', onScroll, true);
        return () => container.removeEventListener('scroll', onScroll, true);
    }, [route]);

    return (
        <div className={classnames(className, styles['main-nav-bars-container'])}>
            <HorizontalNavBar
                className={styles['horizontal-nav-bar']}
                scrolled={scrolled}
                route={route}
                query={query}
                backButton={false}
                searchBar={true}
                fullscreenButton={true}
                navMenu={true}
                tabs={
                    <VerticalNavBar
                        ref={navRef}
                        className={styles['vertical-nav-bar']}
                        selected={route}
                        tabs={TABS}
                    />
                }
            />
            <div ref={contentRef} className={classnames(styles['nav-content-container'], { [styles['no-nav-padding']]: route === 'board' })}>{children}</div>
        </div>
    );
});

export default MainNavBars;

