import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupActionTracking, setupMapTest } from 'ember-google-maps/test-support';
import { setupLocations } from 'dummy/tests/helpers/locations';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function getWaypoints(directions) {
  return directions[0].directions.request.waypoints;
}

module('Integration | Component | g-map/waypoint', function(hooks) {
  setupRenderingTest(hooks);
  setupMapTest(hooks);
  setupLocations(hooks);
  setupActionTracking(hooks);

  test('it adds a waypoint to the directions', async function(assert) {
    this.origin = 'Covent Garden';
    this.destination = 'Clerkenwell';
    this.waypointLocation = 'Leather Lane';

    await render(hbs`
      {{#g-map lat=lat lng=lng as |g|}}
        {{#g.directions
          origin=origin
          destination=destination
          travelMode="WALKING"
          onDirectionsChanged=(action trackAction 'directionsReady')as |d|}}
          {{d.waypoint location=waypointLocation}}
        {{/g.directions}}
      {{/g-map}}
    `);

    await this.seenAction('directionsReady', { timeout: 10000 });

    let { components: { directions } } = this.gMapAPI;
    let request = directions[0].directions.request;

    assert.equal(request.waypoints.length, 1);
    assert.equal(request.waypoints[0].location.query, this.waypointLocation);
  });

  test('it updates the current directions when added', async function(assert) {
    this.origin = 'Covent Garden';
    this.destination = 'Clerkenwell';
    this.waypointLocation = 'Leather Lane';
    this.addWaypoint = true;

    await render(hbs`
      {{#g-map lat=lat lng=lng as |g|}}
        {{#g.directions
          origin=origin
          destination=destination
          travelMode="WALKING"
          onDirectionsChanged=(action trackAction 'directionsReady') as |d|}}
          {{#if addWaypoint}}
            {{d.waypoint location=waypointLocation}}
          {{/if}}
        {{/g.directions}}
      {{/g-map}}
    `);

    await this.seenAction('directionsReady', { timeout: 10000 });

    let { components: { directions } } = this.gMapAPI;
    let waypoints = getWaypoints(directions);

    assert.equal(waypoints.length, 1);

    this.set('addWaypoint', false);

    await this.seenAction('directionsReady', { timeout: 10000 });

    directions = this.gMapAPI.components.directions;
    waypoints = getWaypoints(directions);

    assert.equal(waypoints.length, 0);
  });
});
