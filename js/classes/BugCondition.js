const BugCondition = {
    // cell is occupied by bug of own color
    FRIEND: 'Friend',
    // cell is occupied by adversarial bug
    FOE: 'Foe',
    // cell is occupied by friendly bug carrying food
    FRIEND_WITH_FOOD: 'FriendWithFood',
    // cell is occupied by adversarial bug carrying food
    FOE_WITH_FOOD: 'FoeWithFood',
    // cell contains food
    FOOD: 'Food',
    // cell is an obstacle
    ROCK: 'Rock',
    // cell contains own marker with number i
    MARKER: 'Marker',
    // cell has adversarial marker
    FOE_MARKER: 'FoeMarker',
    // cell is part of own nest
    HOME: 'Home',
    // cell is part of adversarial nest
    FOE_HOME: 'FoeHome',
};