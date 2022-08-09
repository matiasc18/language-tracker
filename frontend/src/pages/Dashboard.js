import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, getFavorites, getUserGames, reset } from '../features/user/userSlice.js';
import Games from '../components/Games';

// User profile screen
const Dashboard = () => {
  // For re-routing / redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userInfo, games, favorites } = useSelector((state) => state.user);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // Runs whenever redux auth state changes
  useEffect(() => {
    // If no logged in user, go home
    if (!user) {
      navigate('/');
      return;
    }

    dispatch(getUserGames());
    dispatch(getFavorites());
    dispatch(getUser());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return (
    <main id="dashboard">
      {user && userInfo && games && favorites && <>
        <section id="bio">
          <h2>{user.username}</h2>
          <hr />
          <span className="bio-details"><strong>Joined</strong> {userInfo.joined}</span>
          <span className="bio-details"><strong>Games:</strong> {userInfo.gamesCount}</span>
          <span className="bio-details"><strong>Favorites:</strong> {userInfo.favCount}</span>
        </section>
        <section id="dashboard-favorites">
          <h2>Favorites</h2>
          <hr />
          <div id="user-favorites">
            <Games games={favorites} list={1} />
          </div>
        </section>
        <section id="dashboard-games">
          <h2>Games</h2>
          <hr />
          <div id="user-games">
            <Games games={games} list={2} />
          </div>
        </section>
      </>}
    </main>
  )
}

export default Dashboard;