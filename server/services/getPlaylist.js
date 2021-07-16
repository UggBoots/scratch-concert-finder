const predictHQConcerts = require('./predictHQConcerts');
const spotifyAccessToken = require('./spotifyAccessToken');
const spotifyArtistSearch = require('./spotifyArtistSearch');
const spotifyArtistTopTracks = require('./spotifyArtistTopTracks');
const googleMapsDistance = require('./googleMapsDistance');
const googleMapsPlaceLatLong = require('./googleMapsPlaceLatLong');

const getPlaylist = async ({ placeId }) => {
  try {
    const coordinates = await googleMapsPlaceLatLong(placeId);
    const concerts = await predictHQConcerts(coordinates);
    const spotifyToken = await spotifyAccessToken();
    const p = await Promise.all(
      concerts.map(async (concert) => {
        const { entities, location, start, end, title } = concert;
        if (!entities || entities.length === 0) return;
        const venue = entities[0];
        const titleScrubbed = title.replace(/[^\w\s]/gi, '');
        const artistSearchResults = await spotifyArtistSearch({
          title: titleScrubbed,
          spotifyToken,
        });
        if (!artistSearchResults || artistSearchResults.length === 0) return;
        const artist = artistSearchResults[0];
        const topTracks = await spotifyArtistTopTracks({ artistId: artist.id, spotifyToken });
        if (!topTracks || topTracks.length === 0) return;
        const tracksToAddtoPlaylist = topTracks.length > 3 ? topTracks.slice(0, 3) : topTracks;
        const distance = await googleMapsDistance({
          pointA: placeId,
          pointB: venue.formatted_address,
        });
        const tracksPayload =
          tracksToAddtoPlaylist?.map((track) => ({
            track: {
              id: track.id,
              name: track.name,
              uri: track.uri,
              href: track.href,
              external_urls: track.external_urls
            },
            album: {
              id: track.album.id,
              name: track.album.name,
              uri: track.album.uri,
              images: track.album.images,
              href: track.album.href,
              external_urls: track.album.external_urls
            },
            artist: {
              id: track.artists[0].id,
              name: track.artists[0].name,
              href: track.artists[0].href,
              uri: track.artists[0].uri,
              external_urls: track.artists[0].external_urls
            },
            venue: venue.name,
            address: venue.formatted_address,
            location,
            start,
            end,
            distance,
            spotifyToken,
            ticketPriceRange: [],
            ticketsLink: `https://www.google.com/search?q=${title}+tickets`,
          })) || [];
        return tracksPayload;
      })
    );
    const playlist = [].concat.apply([], p.filter((e) => !!e))
    return playlist;
  } catch (e) {
    throw new Error(`getPlaylist error: ${e.message}`);
  }
};

module.exports = {
  getPlaylist,
};
