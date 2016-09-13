import React from 'react';
import classNames from 'classnames';

const ReactImagePreloader = React.createClass( {

    getInitialState() {
        return {
            loaded: false,

            placeholder: this.props.placeholder || false,
            showPlaceholder: false,

            hero: this.props.src,
            heroLoaded: false,
            heroFade: false,

            classes: this.props.classes,

            src: '',
            alt: ''
        };
    },

    postLoadCleanup() {

        const _this = this;

        setTimeout( function () {
            _this.setState( {
                showPlaceholder: false
            } );
        }, 20000 );
    },

    loadHero() {

        const _this = this;
        const img = new Image();

        const loaded = function() {
            _this.setState( {
                hero: _this.state.hero,
                heroLoaded: true
            } );
            _this.forceUpdate();

            setTimeout( function () {
                _this.setState( {
                    heroFade: true
                } );
                _this.postLoadCleanup();
            }, 100 );
        };

        img.addEventListener( 'load', loaded, false );
        img.src = _this.state.hero;
    },

    loadPlaceholder() {

        const _this = this;
        const img = new Image();

        const loaded = function() {
            _this.setState( {
                showPlaceholder: true
            } );
            _this.forceUpdate();

            setTimeout( function () {

                _this.loadHero();

            }, 1000 );
        };

        img.addEventListener( 'load', loaded, false );
        img.src = _this.state.placeholder;
    },

    componentDidMount: function() {
        const _this = this;

        setTimeout( function () {

            if( _this.state.placeholder ) {
                _this.loadPlaceholder();
            }
            else {
                _this.loadHero();
            }


        }, 1 );

    },

    render() {

        let placeholder = null;
        let hero = null;

        if( this.state.showPlaceholder ) {
            placeholder = <img
                className="placeholder"
                style={{
                    backgroundImage: 'url(' + this.state.placeholder + ')'
                }}
            />;
        }

        if( this.state.heroLoaded ) {
            hero = <img
                className={
                    classNames( {
                        'image': true,
                        'active': this.state.heroFade
                    } )
                }
                style={{
                    backgroundImage: 'url(' + this.state.hero + ')'
                }}
            />;
        }

        return (
            <div
                className={ this.state.classes }>
                { placeholder }
                { hero }
            </div>
        );
    }


} );


module.exports = ReactImagePreloader;
