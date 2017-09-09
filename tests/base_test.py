"""Module to house setup, teardown and utility class for testing."""

from unittest import TestCase

from api.models import db, Activity, Point, Society, User
from app import create_app


class BaseTestCase(TestCase):
    """Contain utility required for testing."""

    def setUp(self):
        """Setup function to configure test enviroment."""
        self.app = create_app('Testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.drop_all()
        db.create_all()

        # test client
        self.client = self.app.test_client()

        # mock user
        self.member = User(email="someonecool.andela.com",
                           name="thecoolest",
                           user_id="-Ksomeid",
                           role="member",
                           country="ke/ug/niger/ny/sa/tz/rw")

        self.admin = User(email="coolAdmin.andela.com",
                          name="thecoolestAdmin",
                          user_id="-KsomeidAdmin",
                          role="admin",
                          country="ke/ug/niger/ny/sa/tz/rw")

        # mock societies
        self.istelle = Society(name="istelle",
                               photo="url/imgae",
                               logo="url/image",
                               color_scheme="#00ff4567")

        self.sparks = Society(name="sparks",
                              photo="url/imgae",
                              logo="url/image",
                              color_scheme="#00ff4567")

        self.phenix = Society(name="phenix",
                              photo="url/imgae",
                              logo="url/image",
                              color_scheme="#00ff4567")

        # mock points
        self.point = Point(value=2500,
                           name="interview-2017-sep-23rd")

        # mock interview
        self.activity = Activity(
            name="Interview",
            value=50,
            description="members earn 50 points per activity",
            photo="cool/icon/url")

    def tearDown(self):
        """Clean up after every test."""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
