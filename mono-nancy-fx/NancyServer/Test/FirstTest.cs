using System;

using NUnit.Framework;

namespace Test
{
    [TestFixture]
    public class FirstTest
    {
        [SetUp]
        protected void SetUp()
        {
        }

        [Test]
        public void SampleTest()
        {
            Assert.IsTrue(true);
        }
    }
}