import React from 'react';
import classNames from 'classnames';

const ReactImagePreloader = React.createClass( {

    getInitialState() {
        return {

            placeholder: this.props.placeholder || false,
            placeholderShow: false,

            hero: this.props.src,
            heroLoaded: false,
            heroActive: false,

            classes: this.props.classes || '',

            src: '',
            alt: ''
        };
    },

    postLoadCleanup() {

        const _this = this;

        setTimeout( function () {
            _this.setState( {
                placeholderShow: false
            } );
        }, 20000 );
    },

    placeholderLoaded() {
        const _this = this;

        _this.setState( {
            placeholderShow: true
        } );

        setTimeout( function () {

            _this.loadImage( 'hero' );

        }, 1000 );
    },

    heroLoaded() {

        const _this = this;

        _this.setState( {
            hero: _this.state.hero,
            heroLoaded: true
        } );
        _this.forceUpdate();

        setTimeout( function () {
            _this.setState( {
                heroActive: true
            } );
            _this.postLoadCleanup();
        }, 100 );
    },

    loadImage( _type ) {

        const _this = this;
        const img = new Image();
        const src = ( _type === 'hero' ) ? _this.state.hero : _this.state.placeholder;

        const loaded = function() {

            if( _type === 'hero' ) {
                _this.heroLoaded();
            }
            else {
                _this.placeholderLoaded();
            }
        };

        img.addEventListener( 'load', loaded, false );
        img.src = src;

    },

    componentDidMount: function() {
        const _this = this;
        const imageType = ( _this.state.placeholder ) ? 'placeholder' : 'hero';

        setTimeout( function () {
            _this.loadImage( imageType );
        }, 1 );

    },

    render() {

        let placeholder = null;
        let hero = null;

        if( this.state.placeholderShow ) {
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
                        'active': this.state.heroActive
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
