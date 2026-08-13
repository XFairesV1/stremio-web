// Copyright (C) 2017-2026 Smart code 203358507

const React = require('react');
const { default: Icon } = require('@stremio/stremio-icons/react');
const { useNavigateWithOrigin } = require('stremio-router');
const { default: Button } = require('stremio/components/Button');
const { default: Image } = require('stremio/components/Image');
const getMetaDetailsHref = require('stremio/common/getMetaDetailsHref').default;
const styles = require('./styles');

const BoardHero = ({ item }) => {
    const { navigateWithOrigin } = useNavigateWithOrigin();
    const detailsHref = React.useMemo(() => {
        return getMetaDetailsHref(item?.deepLinks, true);
    }, [item]);
    const playHref = React.useMemo(() => {
        return typeof item?.deepLinks?.player === 'string' ? item.deepLinks.player : detailsHref;
    }, [item, detailsHref]);
    const onPlayClick = React.useCallback((event) => {
        if (typeof playHref === 'string') {
            event.preventDefault();
            navigateWithOrigin(playHref);
        }
    }, [playHref, navigateWithOrigin]);
    const onInfoClick = React.useCallback((event) => {
        if (typeof detailsHref === 'string') {
            event.preventDefault();
            navigateWithOrigin(detailsHref);
        }
    }, [detailsHref, navigateWithOrigin]);
    if (!item) {
        return null;
    }
    return (
        <div className={styles['board-hero-container']}>
            <div className={styles['board-hero-backdrop-container']}>
                <Image
                    className={styles['board-hero-backdrop']}
                    src={item.background || item.poster}
                    alt={' '}
                    renderFallback={() => null}
                />
                <div className={styles['board-hero-gradient-bottom']} />
                <div className={styles['board-hero-gradient-left']} />
            </div>
            <div className={styles['board-hero-info-container']}>
                {
                    item.logo ?
                        <Image className={styles['board-hero-logo']} src={item.logo} alt={item.name} renderFallback={() => (
                            <div className={styles['board-hero-title']}>{item.name}</div>
                        )} />
                        :
                        <div className={styles['board-hero-title']}>{item.name}</div>
                }
                {
                    typeof item.description === 'string' && item.description.length > 0 ?
                        <div className={styles['board-hero-description']}>{item.description}</div>
                        :
                        null
                }
                <div className={styles['board-hero-actions-container']}>
                    <Button className={styles['board-hero-play-button']} href={playHref} onClick={onPlayClick} title={'Play'}>
                        <Icon className={styles['icon']} name={'play'} />
                        <div className={styles['label']}>{'Play'}</div>
                    </Button>
                    <Button className={styles['board-hero-info-button']} href={detailsHref} onClick={onInfoClick} title={'More Info'}>
                        <Icon className={styles['icon']} name={'details'} />
                        <div className={styles['label']}>{'More Info'}</div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

module.exports = BoardHero;
